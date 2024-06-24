import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from './entities/bank-account.entity';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
  ) {}

  findAll(): Promise<BankAccount[]> {
    return this.bankAccountRepository.find();
  }

  findOne(bank_account_id: string): Promise<BankAccount> {
    return this.bankAccountRepository.findOne({where: {bank_account_id}});
  }

  create(bankAccountData: BankAccount): Promise<BankAccount> {
    return this.bankAccountRepository.save(bankAccountData);
  }

  async update(id: string, updateData: Partial<BankAccount>): Promise<void> {
    await this.bankAccountRepository.update(id, updateData);
  }

  async remove(id: string): Promise<void> {
    await this.bankAccountRepository.delete(id);
  }
}