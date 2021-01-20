import {
  Controller,
  Header,
  Body,
  Param,
  Get,
  Post,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  @Post('/configure')
  async setConfig(): Promise<boolean> {
    return true;
  }

  @Get()
  async getConfig(): Promise<string> {
    return 'This action returns site config:';
  }
}