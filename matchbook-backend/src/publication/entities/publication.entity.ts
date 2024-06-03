import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Book } from '../../book/entities/book.entity';

@Entity('publications')
export class Publication {
  @PrimaryColumn()
  id_publication: string;

  @Column()
  date_publication: Date;

  @ManyToOne(() => Users, (user) => user.publications)
  @JoinColumn({ name: 'user_rut_user' })
  user_rut_user: number;
  
  @ManyToOne(() => Book, (book) => book.publications)
  @JoinColumn({ name: 'book_id_book' })
  book: Book;

  @Column()
  book_id_book: string;

  @Column({name: 'cost_book'})
  cost_book: number;

  @Column()
  photo_showcase: string;

  @Column()
  photo_cover: string;

  @Column()
  photo_first_page: string;

  @Column()
  photo_back_cover: string;
}