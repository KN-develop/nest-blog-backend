import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: ['http://localhost', 'https://localhost', 'http://localhost:3000', 'https://localhost:3000'],
  });

  await app.listen(4000);
}

bootstrap();
