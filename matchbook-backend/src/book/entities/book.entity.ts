import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Author } from '../../author/entities/author.entity';
import { Publisher } from '../../publisher/entities/publisher.entity';
import { Publication } from 'src/publication/entities/publication.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id_book: string;

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

  @OneToMany(() => Publication, publication => publication.book_id_book)
  publications: Publication[]

}
