import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  async create(region: Region): Promise<Region> {
    return await this.regionRepository.save(region);
  }
  findAll(): Promise<Region[]> {
    return this.regionRepository.find();
  }

  findOne(id_region: number): Promise<Region | null> {
    return this.regionRepository.findOneBy({id_region});
  }
  async update(id_region: number, user: Region): Promise<Region> {
    await this.regionRepository.update(id_region, user);
    return this.findOne(+id_region);
  }
  async remove(id: number): Promise<void> {
    await this.regionRepository.delete(+id);
  }
}

