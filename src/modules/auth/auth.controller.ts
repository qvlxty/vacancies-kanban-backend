import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/authUser.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  public auth(@Body() { login, password }: AuthUserDto) {
    return this.authService.login({
      login,
      password,
    });
  }
}
