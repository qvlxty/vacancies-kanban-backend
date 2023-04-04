import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/authUser.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(login: string, pass: string) {
    const user = await this.usersService.findOne(login);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: AuthUserDto) {
    const foundUser = await this.validateUser(user.login, user.password)
    if (!foundUser) {
      throw new NotFoundException('Пользователь не найден. Неправильный логин или пароль')
    }
    return {
      access_token: this.jwtService.sign({
        id: foundUser.id,
        login: foundUser.login
      }),
    };
  }
}
