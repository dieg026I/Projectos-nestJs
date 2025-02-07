import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')

export class AuthController {

  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('validate')
  async login(@Request() req) {
    return this.authService.login(req.user);
    
  }
}