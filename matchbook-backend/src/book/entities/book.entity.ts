import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Author } from '../../author/entities/author.entity';
import { Publisher } from '../../publisher/entities/publisher.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id_book: number;

  @Column()
  name_book: string;

  @Column('decimal')
  cost_book: number;

  @Column('int')
  year_book: number;

  @Column('text')
  description_book: string;

  @ManyToOne(() => Author, author => author.books)
  author_id_author: Author;

  @ManyToOne(() => Publisher, publisher => publisher.books)
  publisher_id_publisher: Publisher;
}
