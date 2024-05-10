import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Book } from '../../book/entities/book.entity';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn('uuid')
  id_publication: string;

  @Column()
  date_publication: Date;

  @ManyToOne(() => Users, user => user.publications)
  user_rut_user: Users;

  @ManyToOne(() => Book, book => book.publications)
  book_id_book: Book;

  @Column()
  photo_showcase: string;

  @Column()
  photo_cover: string;

  @Column()
  photo_first_page: string;

  @Column()
  photo_back_cover: string;
}