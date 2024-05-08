import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';


@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  create(author: Author) {
    return this.authorRepository.save(author);
  }

  findAll() {
    return this.authorRepository.find();
  }

  findOne(id_author: number): Promise <Author> {
    return this.authorRepository.findOne( { where: {id_author} } );
  }

  update(id: number, author: Author) {
    return this.authorRepository.update(id, author);
  }

  remove(id: number) {
    return this.authorRepository.delete(id);
  }
}
