import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')

export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body('email_user') email_user: string, @Body('password_users') password_users: string) {
    return this.authService.validateUser(email_user, password_users);
  }
}