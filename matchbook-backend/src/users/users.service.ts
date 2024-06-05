import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findOne( lastname_user: string): Promise<Users> {
    return this.usersRepository.findOneBy({lastname_user});
  }

  findOneEmail(email_user: string): Promise<Users> {
    return this.usersRepository.findOne({ where: { email_user } });
  }

  findAllWithCity(): Promise<Users[]> {
    return this.usersRepository.find({ relations: ['cities'] })
      .catch(error => {
        console.error('Error fetching publications with city:', error);
        throw error;
      });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: Users): Promise<Users> {
    const hashedPassword = await bcrypt.hash(user.password_users, 10);
    user.password_users = hashedPassword;
    return this.usersRepository.save(user);
  }

  async update(id: string, user: Users): Promise<void> {
    await this.usersRepository.update(id, user);
  }


}
