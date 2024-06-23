import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { ShoppingCart } from './entities/shopping_cart.entity';

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) {}

    @Post()
    async create(@Body() shoppingCartData: Partial<ShoppingCart>): Promise<ShoppingCart> {
        return this.shoppingCartService.create(shoppingCartData);
    }

    @Get()
    async findAll(): Promise<ShoppingCart[]> {
        return this.shoppingCartService.findAll();
    }

    @Get('oneCart/:id')
    async findOne(@Param('id') id: number): Promise<ShoppingCart> {
        return this.shoppingCartService.findOne(id);
    }

    @Get('userCart/:id')
    async findOneCart(@Param('id') id: number): Promise<ShoppingCart> {
        return this.shoppingCartService.findOneCart(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateData: Partial<ShoppingCart>): Promise<ShoppingCart> {
        return this.shoppingCartService.update(id, updateData);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.shoppingCartService.remove(id);
    }

    @Post('publicationCart/:idCart/publications/:idPublication')
    async addPublicationToCart(@Param('idCart') id_shopping_cart: number, @Param('idPublication') id_publication: string) {
        return this.shoppingCartService.addPublicationToCart(id_shopping_cart, id_publication);
    }
}
