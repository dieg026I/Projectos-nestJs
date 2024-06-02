import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email_user',
      passwordField: 'password_users'
    });
  }

  async validate(email_user: string, password_users: string): Promise<any> {
    const user = await this.authService.validateUser(email_user, password_users);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}