import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountType } from './entities/account_type.entity';

@Injectable()
export class AccountTypeService {
  constructor(
    @InjectRepository(AccountType)
    private accountTypeRepository: Repository<AccountType>,
  ) {}

  async findAll(): Promise<AccountType[]> {
    return await this.accountTypeRepository.find({ relations: ['bank_accounts'] });
  }

  async findOne(account_type_id: string): Promise<AccountType> {
    return await this.accountTypeRepository.findOne({where : {account_type_id}, relations: ['bank_accounts'] });
  }

  async create(accountTypeData: AccountType): Promise<AccountType> {
    const newAccountType = this.accountTypeRepository.create(accountTypeData);
    return await this.accountTypeRepository.save(newAccountType);
  }

  async update(account_type_id: string, accountTypeData: Partial<AccountType>): Promise<AccountType> {
    await this.accountTypeRepository.update(account_type_id, accountTypeData);
    return await this.accountTypeRepository.findOne({where: {account_type_id}});
  }

  async remove(account_type_id: string): Promise<void> {
    await this.accountTypeRepository.delete(account_type_id);
  }
}
