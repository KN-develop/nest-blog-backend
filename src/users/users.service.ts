import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { User } from './entities/user.entity';
import saveUnits from '../common/db/helpers/saveUnits';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) {
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<User> | undefined {
    return await this.usersRepository.findOne({
      username: username,
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(username: string, password: string): Promise<boolean> {
    let res: boolean;

    const findUser = await this.findOne(username);
    if (findUser) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: `Пользователь с именем ${username} уже зарегистрирован`,
      }, HttpStatus.FORBIDDEN);
    }

    const user = this.usersRepository.create({ username, password });

    return await saveUnits(this.connection, [user]);
  }
}