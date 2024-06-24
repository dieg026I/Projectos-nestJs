
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BankService } from './bank.service';
import { Bank } from './entities/bank.entity';

@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  findAll(): Promise<Bank[]> {
    return this.bankService.findAll();
  }

  @Get(':code_sbif')
  findOne(@Param('code_sbif') code_sbif: string): Promise<Bank> {
    return this.bankService.findOne(code_sbif);
  }

  @Post()
  create(@Body() bankData: Bank): Promise<Bank> {
    return this.bankService.create(bankData);
  }

  @Put(':code_sbif')
  update(@Param('code_sbif') code_sbif: string, @Body() bankData: Partial<Bank>): Promise<Bank> {
    return this.bankService.update(code_sbif, bankData);
  }

  @Delete(':code_sbif')
  remove(@Param('code_sbif') code_sbif: string): Promise<void> {
    return this.bankService.remove(code_sbif);
  }
}
