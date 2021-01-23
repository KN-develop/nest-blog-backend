import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.use(helmet());
  app.enableCors({
    origin: ['http://localhost', 'https://localhost', 'http://localhost:3000', 'https://localhost:3000'],
  });

  await app.listen(4000);
}

bootstrap();
