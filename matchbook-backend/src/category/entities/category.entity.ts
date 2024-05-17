// category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
import { Book } from '../../book/entities/book.entity'

@Entity('category')
export class Category {
  @PrimaryColumn()
  id_category: string;

  @Column()
  name_category: string;

  @ManyToMany(() => Book, (book) => book.categories)
  @JoinTable({
    name: 'category_book', // nombre de la tabla intermedia
    joinColumn: { name: 'category_id_category', referencedColumnName: 'id_category' },
    inverseJoinColumn: { name: 'book_id_book', referencedColumnName: 'id_book' },
  })
  books: Book[];
}
