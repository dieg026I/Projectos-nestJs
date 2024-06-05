import { Module } from '@nestjs/common';
import { BuyService } from './buy.service';
import { BuyController } from './buy.controller';
import { Buy } from './entities/buy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Buy])],
  controllers: [BuyController],
  providers: [BuyService],
})
export class BuyModule {}
