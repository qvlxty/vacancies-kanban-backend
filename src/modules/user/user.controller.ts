import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  public delete(@Param('id') id: string, @Req() req) {
    if (req.user.id == id) {
      return 'Нельзя удалить себя'
    }
    return this.userService.remove(id);
  }

  @Post('register')
  @UseGuards(AuthGuard('jwt'))
  public async register(@Body() { login, password, fio }: CreateUserDto) {
    await this.userService.register(login, password, fio);
    return 'Пользователь зарегистрирован успешно!';
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  public userlist() {
    return this.userService.list();
  }

}
