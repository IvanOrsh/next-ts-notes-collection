import { TableOfContentsItem } from "./TableOfContentsItem";

export interface Markdown {
  title: string;
  description: string;
  content: string;
  slug: string;
  date: string;
  tableOfContents?: TableOfContentsItem[];
}
