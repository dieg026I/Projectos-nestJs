import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async validateUser(email_user: string, password_users: string): Promise<any> {
    const user = await this.usersService.findOneEmail(email_user);
    console.log(user);
    if (user && await bcrypt.compare(password_users, user.password_users)) {
      const { password_users, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {user_email : user.email_user, sub: user.rut_user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}