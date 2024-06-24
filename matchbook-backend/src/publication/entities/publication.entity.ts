import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn, OneToMany } from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Book } from '../../book/entities/book.entity';
import { Buy } from 'src/buy/entities/buy.entity';
import { ShoppingCart } from 'src/shopping_cart/entities/shopping_cart.entity';

@Entity('publication')
export class Publication {
  @PrimaryColumn()
  id_publication: string;

  @Column()
  date_publication: Date;

  @ManyToOne(() => Users, (user) => user.publication)
  @JoinColumn({ name: 'user_rut_user' })
  users: Users;
  
  @Column()
  user_rut_user: number;
  
  @ManyToOne(() => Book, (book) => book.publication)
  @JoinColumn({ name: 'book_id_book' })
  book: Book;

  @Column()
  book_id_book: string;

  @Column()
  photo_showcase: string;

  @Column()
  photo_cover: string;

  @Column()
  photo_first_page: string;

  @Column()
  photo_back_cover: string;
  
  @Column()
  cost_book: number;
  
  @OneToMany(() => Buy, buy => buy.publication)
  buy: Buy[];

  @ManyToOne(() => ShoppingCart, shoppingCart => shoppingCart.publication)
  @JoinColumn({name:'id_cart'})
  shoppingCart: ShoppingCart;

  @Column()
  id_cart: number;
}