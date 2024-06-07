import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadingClub } from './entities/reading_club.entity';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class ReadingClubService {
  constructor(
    @InjectRepository(ReadingClub)
    private readingClubRepository: Repository<ReadingClub>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<ReadingClub[]> {
    return this.readingClubRepository.find({ relations: ['books'] });
  }

  async findOne(id_club: string): Promise<ReadingClub> {
    return this.readingClubRepository.findOne({ where: { id_club }, relations: ['books'] });
  }
  async create(readingClubData: Partial<ReadingClub>): Promise<ReadingClub> {
    const readingClub = this.readingClubRepository.create(readingClubData);
    return this.readingClubRepository.save(readingClub);
  }

  async update(id_club: string, readingClubData: Partial<ReadingClub>): Promise<ReadingClub> {
    await this.readingClubRepository.update(id_club, readingClubData);
    return this.readingClubRepository.findOne({ where: { id_club } });

  }

  async delete(id: string): Promise<void> {
    await this.readingClubRepository.delete(id);
  }

}