import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Publication } from '../../publication/entities/publication.entity';

@Entity('shopping_cart')
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    id_shopping_cart: number;

    @ManyToOne(() => Users, user => user.shopping_carts)
    @JoinColumn({ name: 'user_id_user' })
    users: Users; 
    @Column()
    user_id_user: number;

    @ManyToOne(() => Publication, publication => publication.shoppingCart)
    @JoinColumn({ name: 'publication_id_publication' })
    publication: Publication;
    @Column()
    publication_id_publication: string;
}
