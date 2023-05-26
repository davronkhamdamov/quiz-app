import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ILoginUser, IRegisterUser } from './interface/auth.interface';
import { AuthorizationGuard } from './guard/auth.guard';
import { CurrentUser } from './getUserDecorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/users')
  async getUser() {
    return await this.authService.getUser();
  }
  @Get('/getProfileInformaton')
  @UseGuards(AuthorizationGuard)
  async getUserInfo(@CurrentUser() { id }: { id: string }) {
    return await this.authService.getUserInfo(id);
  }
  @Post('/register')
  async register(@Body() user: IRegisterUser) {
    return await this.authService.register(user);
  }
  @Post('/login')
  async login(@Body() user: ILoginUser) {
    return await this.authService.login(user);
  }
}
