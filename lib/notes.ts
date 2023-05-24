import { join } from "path";
import fs from "fs";

import matter from "gray-matter";

import { TableOfContentsItem } from "@/interfaces/TableOfContentsItem";
import {
  getDir,
  getSlugFromFileName,
  getFileNames,
  getItemInPath,
  getParser,
  markdownToHtml,
} from "./md";
import { Notes } from "@/interfaces/Notes";

const NOTES_DIR = getDir("/content/notes");

const getNotesFileNames = () => getFileNames(NOTES_DIR);

const getNotesSlugs = () => getNotesFileNames().map(getSlugFromFileName);

// getNotes :: string -> Notes
const getNotes = (fileName: string): Notes => {
  const notes = getItemInPath(join(NOTES_DIR, fileName)) as Notes;

  notes.slug = fileName.replace(/\.md$/, "");
  return notes;
};

const getAllNotes = async (): Promise<Notes[]> => {
  const allNotes = await Promise.all(
    getNotesFileNames()
      .map((notesFileName) => getNotes(notesFileName))
      .sort((note1, note2) =>
        new Date(note1.date) > new Date(note2.date) ? -1 : 1
      )
  );

  return allNotes;
};

// table of contents madness
function extractTableOfContents(content: string): TableOfContentsItem[] {
  const regex = /^\s*-\s*\[([^\]]+)\]\(#([^\\)]+)\)/gm;
  const tableOfContents: TableOfContentsItem[] = [];

  let match;
  const levelStack: number[] = [];
  while ((match = regex.exec(content)) !== null) {
    const title = match[1];
    const anchor = match[2];
    const level = computeLevel(match[1]);

    // Update the level stack
    while (level <= levelStack[levelStack.length - 1]) {
      levelStack.pop();
    }
    levelStack.push(level);

    tableOfContents.push({ title, anchor, level: levelStack.length });
  }

  return tableOfContents;
}

function computeLevel(title: string): number {
  const numberingPattern = /^\d+(\.\d+)*\s/;
  const match = title.match(numberingPattern);

  if (match) {
    const numbering = match[0];
    return numbering.split(".").length;
  }

  return 1;
}

function removeTableOfContents(content: string): string {
  const regex = /^\s*-\s*\[([^\]]+)\]\(#([^\\)]+)\)/gm;
  const updatedContent = content.replace(regex, "");
  return updatedContent;
}

// TODO: refactor!!!!
async function getNotesBySlug(slug: string): Promise<Notes> {
  const fullPath = join(NOTES_DIR, `${slug}.md`);

  const notes = await fs.promises.readFile(fullPath, "utf8");

  const { data, content } = matter(notes);

  const tableOfContents = extractTableOfContents(content);
  const updatedContent = removeTableOfContents(content);

  const parser = await getParser();
  const html = await parser.process(updatedContent);

  // const html = await markdownToHtml(content);

  return {
    ...data,
    tableOfContents,
    content: html.value.toString(),
    // content: html.toString(),
  } as Notes;
}

export { getAllNotes, getNotesSlugs, getNotesBySlug, getFileNames };
