import { Injectable } from '@nestjs/common';
import { Post } from '../../interfaces/post.interface';

@Injectable()
export class PostsService {
  private readonly posts: Post[] = [];

  async create(post: Post): Promise<boolean> {
    this.posts.push(post);
    return true;
  }

  async findAll(): Promise<Post[]> {
    return this.posts;
  }

}