import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cities } from './entities/cities.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(Cities)
    private communeRepository: Repository<Cities>,
  ) {}

  async create(cities: Cities): Promise<Cities> {
    return await this.communeRepository.save(cities);
  }
  findAll(): Promise<Cities[]> {
    return this.communeRepository.find();
  }

  findOne(id_city: number): Promise<Cities | null> {
    return this.communeRepository.findOneBy({id_city});
  }
  async update(id: number, user: Cities): Promise<Cities> {
    await this.communeRepository.update(id, user);
    return this.findOne(id);
  }
  async remove(id_city: number): Promise<void> {
    await this.communeRepository.delete(id_city);
  }
}