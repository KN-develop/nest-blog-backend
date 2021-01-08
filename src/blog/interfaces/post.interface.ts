import { Tag } from './tag.interface';

export interface Post {
  categories: string[];
  tags: Tag[];
  image: string;
  author: string;
  title: string;
  contentHtml: string;
}