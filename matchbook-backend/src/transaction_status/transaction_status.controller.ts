import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TransactionStatusService } from './transaction_status.service';
import { TransactionStatus } from './entities/transaction_status.entity';

@Controller('transaction-status')
export class TransactionStatusController {
  constructor(private readonly transactionStatusService: TransactionStatusService) {}

  @Get()
  findAll() {
    return this.transactionStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionStatusService.findOne(id);
  }

  @Post()
  create(@Body() transactionStatusData: TransactionStatus) {
    return this.transactionStatusService.create(transactionStatusData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() transactionStatusData: TransactionStatus) {
    return this.transactionStatusService.update(id, transactionStatusData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionStatusService.remove(id);
  }
}
