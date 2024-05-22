import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async validateUser(email_user: string, password_users: string): Promise<any> {
    const user = await this.usersService.findOneEmail(email_user);
    console.log(user);
    if (user) {
      const hash = Buffer.from(user.password_users).toString('utf8');
      if (await bcrypt.compare(password_users, hash)) {
        const { password_users, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = {user_email : user.email_user, sub: 'user.rut_user' };
    const secretKeyToken = 'secretKey';
    
    return {
      access_token: this.jwtService.sign(payload, {secret: secretKeyToken}),
      user: user
    };
  }
}