import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(Publisher)
    private publisherRepository: Repository<Publisher>,
  ) {}

  create(publisher: Publisher) {
    return this.publisherRepository.save(publisher);
  }

  findAll() {
    return this.publisherRepository.find();
  }

  findOneForName(name_publisher: string): Promise<Publisher> {
    return this.publisherRepository.findOne({ where: {name_publisher}});
  }

  update(id: string, publisher: Publisher) {
    return this.publisherRepository.update(id, publisher);
  }

  remove(id: string) {
    return this.publisherRepository.delete(id);
  }
}
