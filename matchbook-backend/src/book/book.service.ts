import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  create(book: Book) {
    return this.bookRepository.save(book);
  }

  findAll() {
    return this.bookRepository.find();
  }

  findOnebyid(id_book: string): Promise<Book> {
    return this.bookRepository.findOne({ where: { id_book } });
  }

  update(id: number, book: Book) {
    return this.bookRepository.update(id, book);
  }

  remove(id: number) {
    return this.bookRepository.delete(id);
  }
}
