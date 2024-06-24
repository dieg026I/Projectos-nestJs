import { Module } from '@nestjs/common';
import { ShippingDetailService } from './shipping_detail.service';
import { ShippingDetailController } from './shipping_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingDetail } from './entities/shipping_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingDetail])],
  controllers: [ShippingDetailController],
  providers: [ShippingDetailService],
})
export class ShippingDetailModule {}
