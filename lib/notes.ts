import { join } from "path";
import fs from "fs";

import matter from "gray-matter";

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
    getNotesFileNames().map((notesFileName) => getNotes(notesFileName))
  );

  return allNotes;
};

// TODO: refactor
async function getNotesBySlug(slug: string): Promise<Notes> {
  const fullPath = join(NOTES_DIR, `${slug}.md`);

  const notes = await fs.promises.readFile(fullPath, "utf8");

  const { data, content } = matter(notes);

  const parser = await getParser();
  const html = await parser.process(content);

  // const html = await markdownToHtml(content);

  return {
    ...data,
    content: html.value.toString(),
    // content: html.toString(),
  } as Notes;
}

export { getAllNotes, getNotesSlugs, getNotesBySlug, getFileNames };
