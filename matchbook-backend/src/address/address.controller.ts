import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() addressData: any): Promise<Address> {
    return this.addressService.create(addressData);
  }

  @Get()
  findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  @Get('oneAddress/:id')
  findOne(@Param('id') id: string): Promise<Address> {
    return this.addressService.findOne(id);
  }

  @Get('userAdress/:id')
  findAdress(@Param('id') id: number): Promise<Address[]> {
    return this.addressService.findOneUser(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() addressData: any): Promise<Address> {
    return this.addressService.update(id, addressData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.addressService.remove(id);
  }
}