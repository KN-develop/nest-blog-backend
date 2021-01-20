import { Controller, Body, UseGuards, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    const res = await this.authService.login(req.user);
    return {
      status: 'success',
      data: res
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/register')
  async register(@Body() body) {
    const {username, password} = body;
    await this.authService.createUser(username, password);

    const loginRes = await this.authService.login({username, password});

    return {
      status: 'success',
      message: 'Пользователь успешно зарегистрирован',
      data: loginRes
    };
  }
}
