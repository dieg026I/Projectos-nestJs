import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Publication } from '../../publication/entities/publication.entity';

@Entity('shopping_cart')
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    id_shopping_cart: number;

    @ManyToOne(() => Users, user => user.shopping_carts)
    @Column({ name: 'user_id_user' })
    users: Users;

    @ManyToOne(() => Publication, publication => publication.shoppingCart)
    @Column({ name: 'publication_id_publication' })
    publication: Publication;
}
