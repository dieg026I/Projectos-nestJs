import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';

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

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: Users): Promise<Users> {
    return this.usersRepository.save(user);
  }

  async update(id: string, user: Users): Promise<void> {
    await this.usersRepository.update(id, user);
  }
}
