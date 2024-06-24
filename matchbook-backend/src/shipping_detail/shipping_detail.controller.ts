import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ShippingDetailService } from './shipping_detail.service';
import { ShippingDetail } from './entities/shipping_detail.entity';

@Controller('shipping-details')
export class ShippingDetailController {
  constructor(private readonly shippingDetailService: ShippingDetailService) {}

  @Get()
  getAll(): Promise<ShippingDetail[]> {
    return this.shippingDetailService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<ShippingDetail> {
    return this.shippingDetailService.findOne(id);
  }

  @Post()
  create(@Body() shippingDetailData: ShippingDetail): Promise<ShippingDetail> {
    return this.shippingDetailService.create(shippingDetailData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<ShippingDetail>): Promise<void> {
    return this.shippingDetailService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.shippingDetailService.remove(id);
  }
}