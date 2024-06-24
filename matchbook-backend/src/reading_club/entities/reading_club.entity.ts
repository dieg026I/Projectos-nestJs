import {Entity,PrimaryColumn,Column,ManyToOne,JoinColumn,} from 'typeorm';
import { Book } from '../../book/entities/book.entity';

  @Entity('reading_club')
  export class ReadingClub {
    @PrimaryColumn({ length: 100 })
    id_club: string;
  
    @Column('date')
    date_club: Date;
  
    @Column('time')
    time_club: string;
  
    @Column({ length: 200 })
    place_club: string;
    
    @Column({length: 3000})
    description_club:string;

    @Column({ length: 400 })
    title_club: string;

    @Column()
    image_club: string;
  
    @ManyToOne(() => Book, (book) => book.reading_club)
    @JoinColumn({ name: 'id_book_club' })
    book: Book;

    @Column()
    id_book_club: string;
  }