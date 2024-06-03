import { Module } from '@nestjs/common';
import { ShipmentTypeService } from './shipment_type.service';
import { ShipmentTypeController } from './shipment_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentType } from './entities/shipment_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShipmentType])],
  controllers: [ShipmentTypeController],
  providers: [ShipmentTypeService],
})
export class ShipmentTypeModule {}
