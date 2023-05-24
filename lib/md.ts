import fs from "fs";
import { join } from "path";

import matter from "gray-matter";
import { unified } from "unified";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@leafac/rehype-shiki";
import * as shiki from "shiki";

import { Markdown } from "@/interfaces/Markdown";
import { Notes } from "@/interfaces/Notes";
import { SearchContent } from "@/interfaces/SearchContent";
import { Project } from "@/interfaces/Project";

const getDir = (path: string): string => join(process.cwd(), path);

const getFileNames = (dir: string): string[] => {
  return fs.readdirSync(dir);
};

const getSlugFromFileName = (fileName: string) => fileName.replace(/\.md$/, "");

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
  get: (fileName: string) => Markdown | Notes | Project
): Markdown[] | Notes[] | Project[] =>
  fileNames.map((fileName) => get(fileName));

//====== Markdown parser ==========

// memoize/cache the creation of the markdown parser, this sped up the
// building of the blog from ~60s->~10s
let p: ReturnType<typeof getParserPre> | undefined;

async function getParserPre() {
  return unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({ theme: "poimandres" }),
    })
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      content: (arg) => ({
        type: "element",
        tagName: "a",
        properties: {
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          href: "#" + arg.properties?.id,
          style: "margin-right: 10px",
        },
        children: [{ type: "text", value: "#" }],
      }),
    });
}

function getParser() {
  if (!p) {
    p = getParserPre().catch((e) => {
      p = undefined;
      throw e;
    });
  }
  return p;
}

// TODO: !
const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).use(remarkGfm).process(markdown);

  return result.toString();
};

const saveSearchData = (notes: Notes[]) => {
  const searchFile = getDir("/content/search/index.json");
  const searchItemList: SearchContent[] = [];

  notes.forEach((note) => {
    const { slug, title, description } = note;
    const searchItem: SearchContent = {
      slug,
      title,
      description,
      category: "notes",
    };

    searchItemList.push(searchItem);
  });

  fs.writeFileSync(searchFile, JSON.stringify(searchItemList));
};

export {
  getDir,
  getSlugFromFileName,
  getFileNames,
  getItemInPath,
  getAllItems,
  getParser,
  markdownToHtml,
  saveSearchData,
};
