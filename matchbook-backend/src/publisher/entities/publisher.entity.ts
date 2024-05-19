import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@Entity('publisher')
export class Publisher {
  @PrimaryColumn()
  id_publisher: string;

  @Column()
  name_publisher: string;

  @OneToMany(() => Book, book => book.publisher_id_publisher)
  books: Book[];
}
