import { Module } from '@nestjs/common';
import { BuyService } from './buy.service';
import { BuyController } from './buy.controller';

@Module({
  controllers: [BuyController],
  providers: [BuyService],
})
export class BuyModule {}
