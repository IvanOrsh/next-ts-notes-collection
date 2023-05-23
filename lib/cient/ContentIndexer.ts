import * as JsSearch from "js-search";

import searchIndex from "@/content/search/index.json";
import { SearchContent } from "@/interfaces/SearchContent";

class ContentIndexer {
  private static instance: ContentIndexer;

  private searchEngine!: JsSearch.Search;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  constructor() {
    this.buildIndex();
  }

  public search(query: string): SearchContent[] {
    return this.searchEngine.search(query) as SearchContent[];
  }

  private buildIndex() {
    this.searchEngine = new JsSearch.Search("title");
    this.searchEngine.addIndex("title");
    this.searchEngine.addIndex("description");
    this.searchEngine.addDocuments(searchIndex);
  }
}

export default ContentIndexer.Instance;
