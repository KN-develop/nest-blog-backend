import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { PostController } from './controllers/post.controller';
import { PostsService } from './services/post/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './entities/blogPost.entity';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost, Tag])],
  controllers: [PostController],
  providers: [PostsService],
})
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'blog', method: RequestMethod.POST },
        { path: 'blog/(.*)', method: RequestMethod.POST },
      )
      .forRoutes('blog*');

  }
}