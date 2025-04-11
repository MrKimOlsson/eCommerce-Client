import { IItemThumbnail } from "./IItemTumbnail";

export interface ISearchItem {
    displayLink: string;
    formattedUrl: string;
    htmlFormattedUrl: string;
    htmlSnippet: string;
    htmlTitle: string;
    kind: string;
    link: string;
    snippet: string;
    pagemap: {
      cse_thumbnail?: IItemThumbnail[];
    };
    title: string;
  }