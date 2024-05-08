import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id_publisher: number;

  @Column()
  name_publisher: string;

  @OneToMany(() => Book, book => book.publisher_id_publisher)
  books: Book[];
}
