import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email_user: string, password: string): Promise<any> {
    const user = await this.usersService.findOneEmail(email_user);
    if (user && await bcrypt.compare(password, user.password_users)) {
      const { password_users, ...result } = user;
      return result;
    }
    return null;
  }
}