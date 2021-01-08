import { Controller, Header, Body, Param, Get, Post, Delete, HttpException, HttpStatus } from '@nestjs/common';

@Controller('admin')
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