import { join } from "path";
import fs from "fs";

import matter from "gray-matter";

import { getDir, getFileNames, getItemInPath } from "./md";
import { Notes } from "@/interfaces/Notes";

const NOTES_DIR = getDir("/content/notes");

const getNotesFileNames = () => getFileNames(NOTES_DIR);

// getNotes :: string -> Notes
const getNotes = (fileName: string): Notes => {
  const notes = getItemInPath(join(NOTES_DIR, fileName)) as Notes;
  return notes;
};

const getAllNotes = async (): Promise<Notes[]> => {
  const allNotes = await Promise.all(
    getNotesFileNames().map((notesFileName) => getNotes(notesFileName))
  );

  return allNotes;
};

// TODO: refactor
export async function getNotesBySlug(slug: string): Promise<Notes> {
  const fullPath = join(NOTES_DIR, `${slug}.md`);

  const notes = await fs.promises.readFile(fullPath, "utf8");

  const { data, content } = matter(notes);

  return {
    ...data,
    content,
  } as Notes;
}

export { getAllNotes };
