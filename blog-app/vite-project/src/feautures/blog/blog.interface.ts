export interface IArticle {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  dateISO: string;
  description: string;
  tags: string[];
}

export type IArticleInfo = Pick<
  IArticle,
  "id" | "title" | "tags" | "createdAt" | "author"
>;
