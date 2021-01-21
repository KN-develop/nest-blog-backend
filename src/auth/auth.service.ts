import { Injectable, ImATeapotException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './env/constants';

import * as bcrypt from 'bcrypt';
const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {

      const res = await bcrypt.compareSync(pass, user.password);

      if (res) {
        const { password, ...result } = user;
        return result;
      }

      return null;

    }
    return null;
  }

  async validateUserToken(username: string, token: string) {

  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload, {secret: jwtConstants.secret});

    return {
      access_token: token,
    };
  }

  async createUser(username: string, pass: string): Promise<boolean> {
    const hash: string = await bcrypt.hash(pass, saltRounds);

    return await this.usersService.create(username, hash);
  }
}