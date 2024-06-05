import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buy } from './entities/buy.entity';

@Injectable()
export class BuyService {
  constructor(
    @InjectRepository(Buy)
    private buyRepository: Repository<Buy>,
  ) {}
  create(buy: Buy) {
    return this.buyRepository.save(buy);
  }
  findAll(): Promise<Buy[]> {
    return this.buyRepository.find();
  }

  findOnebyid(id_buy: string): Promise<Buy> {
    return this.buyRepository.findOne({ where: { id_buy } });
  }

  update(id: string, buy: Buy) {
    return this.buyRepository.update(id, buy);
  }

  async remove(id: string): Promise<void> {
    await this.buyRepository.delete(id);
  }
}

