import { Controller, Header, Body, Param, Get, Post, Delete, UsePipes, UseGuards } from '@nestjs/common';
import { CreatePostDto } from '../dto/createPost.dto';
import { PostsService } from '../services/post/post.service';
import { Post as BlogPost } from '../interfaces/post.interface';
import { JoiValidationPipe } from '../../common/validations/joy-validation.pipe';
import { PostSchema } from '../schemes/post.schema';
import { ValidationPipe } from '../../common/validations/validation.pipe';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('blog')
export class PostController {
  constructor(private postService: PostsService) {
  }

  @Get('/posts')
  async findAll(): Promise<BlogPost[]> {
    return await this.postService.findAll();
  }

  @Get('/posts/:id')
  async findById(@Param() params): Promise<string> {
    return 'This action returns post:  ' + params.id;
  }

  @Get(':cat')
  async findCategory(@Param() params): Promise<string> {
    return 'This action returns category:  ' + params.cat;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/posts')
  async create(@Body(new ValidationPipe()) createPostDto: CreatePostDto): Promise<CreatePostDto> {
    //const res = await this.postService.create(createPostDto);

    return createPostDto;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/posts/:id')
  async update(
    @Param('id') id: string,
    @Body() createPostDto: CreatePostDto,
  ): Promise<string> {
    return 'This action create a post';
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/posts/:id')
  async delete(@Param('id') id: string): Promise<string> {
    return 'This action create a post';
  }
}