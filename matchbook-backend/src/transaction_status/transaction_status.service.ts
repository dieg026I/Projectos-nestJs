import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionStatus } from './entities/transaction_status.entity';

@Injectable()
export class TransactionStatusService {
  constructor(
    @InjectRepository(TransactionStatus)
    private transactionStatusRepository: Repository<TransactionStatus>,
  ) {}

  findAll(): Promise<TransactionStatus[]> {
    return this.transactionStatusRepository.find();
  }

  findOne(transaction_status_id: string): Promise<TransactionStatus> {
    return this.transactionStatusRepository.findOne({where : {transaction_status_id} });
  }

  async create(transactionStatusData: TransactionStatus): Promise<TransactionStatus> {
    const transactionStatus = this.transactionStatusRepository.create(transactionStatusData);
    return this.transactionStatusRepository.save(transactionStatus);
  }

  async update(transaction_status_id: string, transactionStatusData: TransactionStatus): Promise<TransactionStatus> {
    await this.transactionStatusRepository.update(transaction_status_id, transactionStatusData);
    return this.transactionStatusRepository.findOne({where: {transaction_status_id}});
  }

  async remove(id: string): Promise<void> {
    await this.transactionStatusRepository.delete(id);
  }
}
