import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from '../../entities/blogPost.entity';
import { Post } from '../../interfaces/post.interface';
import { Connection, Repository } from 'typeorm';
import saveUnits from '../../../common/db/helpers/saveUnits';

@Injectable()
export class PostsService {
  private readonly posts: Post[] = [];

  constructor(
    @InjectRepository(BlogPost)
    private postsRepository: Repository<BlogPost>,
    private connection: Connection,
  ) {
  }

  async create(post: BlogPost): Promise<boolean> {
    const postObject: BlogPost = this.postsRepository.create(post);

    return await saveUnits(this.connection, [postObject]);
  }

  async findAll(): Promise<Post[]> {
    return this.posts;
  }

  async findOne(): Promise<BlogPost> {
    return void 0;
  }

}