import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from '../../entities/blogPost.entity';
import { Post } from '../../interfaces/post.interface';
import { Connection, Repository, getRepository, getConnection } from 'typeorm';
import saveUnits from '../../../common/db/helpers/saveUnits';
import { CreatePostDto } from '../../dto/createPost.dto';
import { AuthService } from '../../../auth/auth.service';
import { AuthSession } from '../../../auth/auth.session';
import * as slug from 'slug';
import { base64ToBlob } from '../../../common/helpers/base64ToBlob';

@Injectable()
export class PostsService {
  private readonly posts: Post[] = [];

  constructor(
    @InjectRepository(BlogPost)
    private postsRepository: Repository<any>,
    private connection: Connection,
  ) {
  }

  async create(post: CreatePostDto): Promise<boolean> {
    const userId = AuthSession.id;

    const postObject: BlogPost = this.postsRepository.create({
      author: userId,
      ...post,
      slug: post.slug || Date.now(),
    });

    return await saveUnits(this.connection, [postObject]);
  }

  async findAll(): Promise<any[]> {
    const res = await getRepository(BlogPost)
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .getMany();

    const posts = res.map(post => {
      return {
        ...post,
        author: post.author.firstName,
      };
    });
    return posts;
  }

  async delete(id: number): Promise<void> {
    await getRepository(BlogPost)
      .createQueryBuilder()
      .delete()
      .from(BlogPost)
      .where('id = :id', { id })
      .execute();
  }

  async update(id: number, post: CreatePostDto): Promise<boolean> {
    const res = await getRepository(BlogPost)
      .createQueryBuilder()
      .update(post)
      .set(post)
      .where('id = :id', { id })
      .execute();

    return !!res.affected;
  }

  async findOne(slug: string): Promise<BlogPost> {
    const res = await getRepository(BlogPost)
      .createQueryBuilder()
      .select()
      .where('slug = :slug', { slug })
      .execute();

    return res;
  }

}