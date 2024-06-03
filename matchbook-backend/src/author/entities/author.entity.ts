import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@Entity('author')
export class Author {
  @PrimaryColumn()
  id_author: string;

  @Column()
  name_author: string;

  @OneToMany(() => Book, book => book.author)
  books: Book[];
}
