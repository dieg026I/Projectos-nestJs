import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id_author: number;

  @Column()
  name_author: string;

  @OneToMany(() => Book, book => book.author_id_author)
  books: Book[];
}
