import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinColumn, PrimaryColumn } from 'typeorm';
import { Author } from '../../author/entities/author.entity';
import { Publisher } from '../../publisher/entities/publisher.entity';
import { Publication } from 'src/publication/entities/publication.entity';
import { Category } from 'src/category/entities/category.entity';

@Entity('book')
export class Book {
  @PrimaryColumn()
  id_book: string;

  @Column()
  name_book: string;

  @Column()
  year_book: number;

  @Column()
  description_book: string;

  @Column()
  status_book : string;

  @Column()  
  stock_book : number;

  @Column()
  format_book: string;
  
  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'author_id_author' })
  author: Author;
  
  @Column()
  author_id_author: string;

  @ManyToOne(() => Publisher, publisher => publisher.books)
  @JoinColumn({ name: 'publisher_id_publisher' })
  publisher: Publisher;

  @Column()
  publisher_id_publisher: string;

  @OneToMany(() => Publication, publication => publication.book_id_book)
  publications: Publication[]

  @ManyToMany(() => Category, (category) => category.books)
  categories: Category[];

}
