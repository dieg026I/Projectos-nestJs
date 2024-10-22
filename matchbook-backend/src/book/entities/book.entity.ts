import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinColumn, PrimaryColumn } from 'typeorm';
import { Author } from '../../author/entities/author.entity';
import { Publisher } from '../../publisher/entities/publisher.entity';
import { Publication } from 'src/publication/entities/publication.entity';
import { Category } from 'src/category/entities/category.entity';
import { ReadingClub } from 'src/reading_club/entities/reading_club.entity';

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
  author_id_author: Author;
  
 

  @ManyToOne(() => Publisher, publisher => publisher.books)
  @JoinColumn({ name: 'publisher_id_publisher' })
  publisher_id_publisher: Publisher;

 

  @OneToMany(() => Publication, publication => publication.book)
  publication: Publication[]

  @ManyToMany(() => Category, (category) => category.books)
  categories: Category[];

  @OneToMany(() => ReadingClub, readingClub => readingClub.book)
  reading_club: ReadingClub[]

}
