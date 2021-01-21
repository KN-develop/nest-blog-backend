import { Controller, Header, Body, Param, Get, Post, Delete, Request, UsePipes, UseGuards } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { CreatePostDto } from '../dto/createPost.dto';
import { PostsService } from '../services/post/post.service';
import {BlogPost} from '../entities/blogPost.entity';
import { ValidationPipe } from '../../common/validations/validation.pipe';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AuthSession } from '../../auth/auth.session';

@Controller('blog')
export class PostController {
  constructor(private postService: PostsService) {
  }

  @Get('/posts')
  async findAll(): Promise<BlogPost[]> {
    return await this.postService.findAll();
  }

  @Get('/posts/:slug')
  async findById(@Param() params): Promise<BlogPost> {
    return await this.postService.findOne(params.slug);
  }

  @Get(':cat')
  async findCategory(@Param() params): Promise<string> {
    return 'This action returns category:  ' + params.cat;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/posts')
  async create(@Body(new ValidationPipe()) createPostDto: CreatePostDto, @Request() req: Request): Promise<boolean> {
    return await this.postService.create(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/posts/:id')
  async update(
    @Param('id') id: string,
    @Body() createPostDto: CreatePostDto,
  ): Promise<boolean> {
    return await this.postService.update(parseInt(id), createPostDto);;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/posts/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.postService.delete(parseInt(id));
    return void 0;
  }
}