import fs from "fs";
import { join } from "path";

import matter from "gray-matter";

import { Markdown } from "@/interfaces/Markdown";
import { Notes } from "@/interfaces/Notes";

const getDir = (path: string): string => join(process.cwd(), path);

const getFileNames = (dir: string): string[] => {
  return fs.readdirSync(dir);
};

// getItemInPath :: string -> Markdown
const getItemInPath = (filePath: string): Markdown => {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    content,
  } as Markdown;
};

const getAllItems = (
  fileNames: string[],
  get: (fileName: string) => Markdown | Notes
): Markdown[] | Notes[] => fileNames.map((fileName) => get(fileName));

export { getDir, getFileNames, getItemInPath, getAllItems };
