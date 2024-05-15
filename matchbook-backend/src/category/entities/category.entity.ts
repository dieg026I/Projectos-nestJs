// category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Book } from '../../book/entities/book.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id_category: string;

  @Column()
  name_category: string;

  @ManyToMany(() => Book, (book) => book.categories)
  @JoinTable({
    name: 'category_book', // nombre de la tabla intermedia
    joinColumn: { name: 'id_category', referencedColumnName: 'id_category' },
    inverseJoinColumn: { name: 'id_book', referencedColumnName: 'id_book' },
  })
  books: Book[];
}
