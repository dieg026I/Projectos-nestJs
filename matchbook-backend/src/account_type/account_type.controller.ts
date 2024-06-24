import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AccountTypeService } from './account_type.service';
import { AccountType } from './entities/account_type.entity';

@Controller('account-types')
export class AccountTypeController {
  constructor(private readonly accountTypeService: AccountTypeService) {}

  @Get()
  findAll(): Promise<AccountType[]> {
    return this.accountTypeService.findAll();
  }

  @Get(':account_type_id')
  findOne(@Param('account_type_id') account_type_id: string): Promise<AccountType> {
    return this.accountTypeService.findOne(account_type_id);
  }

  @Post()
  create(@Body() accountTypeData: AccountType): Promise<AccountType> {
    return this.accountTypeService.create(accountTypeData);
  }

  @Put(':account_type_id')
  update(@Param('account_type_id') account_type_id: string, @Body() accountTypeData: Partial<AccountType>): Promise<AccountType> {
    return this.accountTypeService.update(account_type_id, accountTypeData);
  }

  @Delete(':account_type_id')
  remove(@Param('account_type_id') account_type_id: string): Promise<void> {
    return this.accountTypeService.remove(account_type_id);
  }
}
