
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { Transfer } from './entities/transfer.entity';

@Controller('transfers')
export class TransferController {
    constructor(private readonly transferService: TransferService) {}

    @Post()
    async createTransfer(@Body() transfer: Transfer): Promise<Transfer> {
        return this.transferService.createTransfer(transfer);
    }

    @Get()
    findAll(): Promise<Transfer[]> {
      return this.transferService.findAll();
    }

    @Get(':transactionId')
    async getTransferById(@Param('transactionId') transactionId: string): Promise<Transfer | undefined> {
        return this.transferService.getTransferById(transactionId);
    }

    @Put(':transactionId')
    async updateTransfer(
        @Param('transactionId') transactionId: string,
        @Body() updatedTransfer: Partial<Transfer>,
    ): Promise<Transfer | undefined> {
        return this.transferService.updateTransfer(transactionId, updatedTransfer);
    }

    @Delete(':transactionId')
    async deleteTransfer(@Param('transactionId') transactionId: string): Promise<void> {
        return this.transferService.deleteTransfer(transactionId);
    }
}
