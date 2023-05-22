import { Markdown } from "./Markdown";

export interface Notes extends Markdown {
  author: string;
  authorImage: string;
  coverImage: string;
}
