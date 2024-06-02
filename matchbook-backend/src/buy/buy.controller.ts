import { Controller, Get, Param, Delete } from '@nestjs/common';
import { BuyService } from './buy.service';
import { Buy } from './entities/buy.entity';

@Controller('buy')
export class BuyController {
  constructor(private readonly buyService: BuyService) {}

  @Get()
  findAll(): Promise<Buy[]> {
    return this.buyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Buy> {
    return this.buyService.findOnebyid(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.buyService.remove(id);
  }
}