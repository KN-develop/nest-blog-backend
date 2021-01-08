import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { PostController } from './controllers/post.controller';
import { PostsService } from './services/post/post.service';

@Module({
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