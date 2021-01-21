import { IsString, IsArray } from 'class-validator';
import { strict } from 'assert';

interface TagInterface {
  title: string;
  href: string;
}

export class CreatePostDto {

  @IsString()
  image?: string;

  @IsString()
  slug?: string;

  @IsString()
  title: string;

  @IsString()
  contentHtml: string;

  @IsString()
  description: string;
}