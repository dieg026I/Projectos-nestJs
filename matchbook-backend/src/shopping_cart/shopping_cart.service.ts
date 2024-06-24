import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './entities/shopping_cart.entity';
import { Publication } from 'src/publication/entities/publication.entity';

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectRepository(ShoppingCart)
        private shoppingCartRepository: Repository<ShoppingCart>,
        @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>
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

    async findOneCart(user_id_user: number): Promise<ShoppingCart> {
        return this.shoppingCartRepository.findOne({where: {user_id_user}, relations: ['publication','publication.users.cities',  'publication.book', 'publication.book.author_id_author', 'publication.book.publisher_id_publisher']});
    }

    async update(id_shopping_cart: number, updateData: Partial<ShoppingCart>): Promise<ShoppingCart> { 
        await this.shoppingCartRepository.update(id_shopping_cart, updateData);
        return this.shoppingCartRepository.findOne({where: {id_shopping_cart}});
    }

    async remove(id: number): Promise<void> {
        await this.shoppingCartRepository.delete(id);
    }

    async addPublicationToCart(id_shopping_cart: number, id_publication: string): Promise<ShoppingCart> {
        // Busca el carro y la publicación en la base de datos
        const cart = await this.shoppingCartRepository.findOne({where: {id_shopping_cart},  relations: ['publication'] });
        const publication = await this.publicationRepository.findOne({where: {id_publication}});
    
        // Si el carro o la publicación no existen, lanza un error
        if (!cart || !publication) {
            throw new Error('El carro o la publicación no existen');
        }
    
        // Agrega la publicación al carro
        cart.publication.push(publication);
    
        // Guarda el carro actualizado en la base de datos
        return this.shoppingCartRepository.save(cart);
    }
}
