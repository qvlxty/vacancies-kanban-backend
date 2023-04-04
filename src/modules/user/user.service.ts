import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  public findOne(login: string): Promise<User | undefined> {
    return this.userRepo.findOne({
      where: {
        login,
      },
    });
  }

  public async register(login: string, password: string, fio: string) {
    const passwordHashed = await bcrypt.hash(password, 10);
    await this.userRepo.save({
      login,
      password: passwordHashed,
      fio
    });
  }

  public remove(userId: string) {
    return this.userRepo.delete({ id: parseInt(userId) })
  }

  public list() {
    return this.userRepo.createQueryBuilder('u')
      .select(['u.login', 'u.fio', 'u.id'])
      .getMany()
  }
}
