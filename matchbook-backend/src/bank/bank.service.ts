import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
  ) {}

  async findAll(): Promise<Bank[]> {
    return await this.bankRepository.find({ relations: ['bank_accounts'] });
  }

  async findOne(code_sbif: string): Promise<Bank> {
    return await this.bankRepository.findOne({where: {code_sbif},  relations: ['bank_accounts'] });
  }

  async create(bankData: Bank): Promise<Bank> {
    const newBank = this.bankRepository.create(bankData);
    return await this.bankRepository.save(newBank);
  }

  async update(code_sbif: string, bankData: Partial<Bank>): Promise<Bank> {
    await this.bankRepository.update(code_sbif, bankData);
    return await this.bankRepository.findOne({where:{code_sbif}});
  }

  async remove(code_sbif: string): Promise<void> {
    await this.bankRepository.delete(code_sbif);
  }

}
