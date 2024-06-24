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
    return this.bookRepository.find({ relations: ['categories', 'publisher_id_publisher' , 'author_id_author'] });
  }

  findOnebyid(id_book: string): Promise<Book> {
    return this.bookRepository.findOne({ where: { id_book } });
  }

  update(id_book: string, book: Book) {
    return this.bookRepository.update(id_book, book);
  }

  remove(id: number) {
    return this.bookRepository.delete(id);
  }
}
