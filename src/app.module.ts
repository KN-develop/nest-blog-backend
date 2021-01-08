import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BlogModule } from './blog/blog.module';
import {AdminModule} from './admin/admin.module';

@Module({
  imports: [BlogModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
