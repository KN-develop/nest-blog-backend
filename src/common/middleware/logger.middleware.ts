import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');

    throw new HttpException({status: HttpStatus.UNAUTHORIZED, error: 'Вы не авторизованы'}, HttpStatus.FORBIDDEN);
    next();
  }
}