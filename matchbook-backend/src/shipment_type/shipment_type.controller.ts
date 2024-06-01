import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ShipmentTypeService } from './shipment_type.service';
import { ShipmentType } from './entities/shipment_type.entity';

@Controller('shipment_type')
export class ShipmentTypeController {
  constructor(private readonly shipmentTypeService: ShipmentTypeService) {}

  @Post()
  create(@Body() shipmentType: ShipmentType) {
    return this.shipmentTypeService.create(shipmentType);
  }

  @Get()
  findAll() {
    return this.shipmentTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentTypeService.findOnebyid(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() shipmentType: ShipmentType) {
    return this.shipmentTypeService.update(id, shipmentType);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentTypeService.remove(id);
  }
}
