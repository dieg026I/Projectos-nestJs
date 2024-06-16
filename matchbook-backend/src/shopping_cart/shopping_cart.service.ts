import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './entities/shopping_cart.entity';

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectRepository(ShoppingCart)
        private shoppingCartRepository: Repository<ShoppingCart>,
    ) {}

    async create(shoppingCartData: Partial<ShoppingCart>): Promise<ShoppingCart> {
        const newShoppingCart = this.shoppingCartRepository.create(shoppingCartData);
        return this.shoppingCartRepository.save(newShoppingCart);
    }

    async findAll(): Promise<ShoppingCart[]> {
        return this.shoppingCartRepository.find();
    }

    async findOne(id_shopping_cart: number): Promise<ShoppingCart> {
        return this.shoppingCartRepository.findOne({where: {id_shopping_cart}});
    }
    

    async update(id_shopping_cart: number, updateData: Partial<ShoppingCart>): Promise<ShoppingCart> {
        await this.shoppingCartRepository.update(id_shopping_cart, updateData);
        return this.shoppingCartRepository.findOne({where: {id_shopping_cart}});
    }

    async remove(id: number): Promise<void> {
        await this.shoppingCartRepository.delete(id);
    }
}
