import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinColumn } from 'typeorm';
import { Author } from '../../author/entities/author.entity';
import { Publisher } from '../../publisher/entities/publisher.entity';
import { Publication } from 'src/publication/entities/publication.entity';
import { Category } from 'src/category/entities/category.entity';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id_book: string;

  @Column()
  name_book: string;

  @Column()
  cost_book: number;

  @Column()
  year_book: number;

  @Column()
  description_book: string;

  @Column()
  status_book : string

  @Column()  
  stock_book : number

  @Column()
  format_book: string
  
  @ManyToOne(() => Author, (author) => author.id_author)
  @JoinColumn({ name: 'author_id_author' })
  author_id_author: Author;
  

  @ManyToOne(() => Publisher, publisher => publisher.books)
  @JoinColumn({ name: 'publisher_id_publisher' })
  publisher_id_publisher: Publisher;

  @OneToMany(() => Publication, publication => publication.book_id_book)
  publications: Publication[]

  @ManyToMany(() => Category, (category) => category.books)
  categories: Category[];

}
