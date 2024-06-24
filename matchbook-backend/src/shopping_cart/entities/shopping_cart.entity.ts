import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Publication } from '../../publication/entities/publication.entity';

@Entity('shopping_cart')
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    id_shopping_cart: number;

    @OneToOne(() => Users, user => user.shopping_carts)
    @JoinColumn({ name: 'user_id_user' })
    users: Users;

    @Column()
    user_id_user: number;

    @OneToMany(() => Publication, publication => publication.shoppingCart)
    publication: Publication[];
}
