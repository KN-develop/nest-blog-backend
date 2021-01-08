import { IsString, IsArray } from 'class-validator';
import { strict } from 'assert';

interface TagInterface {
  title: string;
  href: string;
}

export class CreatePostDto {

  @IsArray()
  categories: string[];

  @IsArray()
  tags: TagInterface[];

  @IsString()
  image: string;

  @IsString()
  author: string;

  @IsString()
  title: string;

  @IsString()
  contentHtml: string;
}