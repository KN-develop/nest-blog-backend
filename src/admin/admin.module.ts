import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';
import { AdminController } from './controllers/admin.controller';

@Module({
  controllers: [AdminController],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'admin*', method: RequestMethod.ALL });
  }
}