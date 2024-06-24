import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { ShoppingCartController } from './shopping_cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping_cart.entity';
import { PublicationService } from 'src/publication/publication.service';
import { Publication } from 'src/publication/entities/publication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart]),TypeOrmModule.forFeature([Publication]) ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService, PublicationService],
})
export class ShoppingCartModule {}
