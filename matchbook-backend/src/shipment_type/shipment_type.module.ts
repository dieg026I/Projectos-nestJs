import { Module } from '@nestjs/common';
import { ShipmentTypeService } from './shipment_type.service';
import { ShipmentTypeController } from './shipment_type.controller';

@Module({
  controllers: [ShipmentTypeController],
  providers: [ShipmentTypeService],
})
export class ShipmentTypeModule {}
