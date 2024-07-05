import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from './entities/transfer.entity';

@Injectable()
export class TransferService {
    constructor(
        @InjectRepository(Transfer)
        private readonly transferRepository: Repository<Transfer>,
    ) {}

    async createTransfer(transfer: Transfer): Promise<Transfer> {
        return this.transferRepository.save(transfer);
    }

    findAll(): Promise<Transfer[]> {
        return this.transferRepository.find({relations: ['publication','publication.users', 'publication.book' ,'statusSend', 'shipment_type'  ]});
    }

    async getTransferById(transaction_id: string): Promise<Transfer | undefined> {
        return this.transferRepository.findOne({where:{transaction_id}});
    }

    async updateTransfer(transactionId: string, updatedTransfer: Partial<Transfer>): Promise<Transfer | undefined> {
        await this.transferRepository.update(transactionId, updatedTransfer);
        return this.getTransferById(transactionId);
    }

    async deleteTransfer(transactionId: string): Promise<void> {
        await this.transferRepository.delete(transactionId);
    }
}