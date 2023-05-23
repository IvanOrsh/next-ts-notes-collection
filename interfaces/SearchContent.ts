import { Markdown } from "./Markdown";

export interface SearchContent
  extends Omit<Markdown, "content" | "date" | "tableOfContents"> {
  category: string;
}
