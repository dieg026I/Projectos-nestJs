import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { BankAccount } from './entities/bank-account.entity';

@Controller('bank-accounts')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Get()
  getAll(): Promise<BankAccount[]> {
    return this.bankAccountService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<BankAccount> {
    return this.bankAccountService.findOne(id);
  }

  @Post()
  create(@Body() bankAccountData: BankAccount): Promise<BankAccount> {
    return this.bankAccountService.create(bankAccountData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<BankAccount>): Promise<void> {
    return this.bankAccountService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bankAccountService.remove(id);
  }
}
