import { Module } from '@nestjs/common';
import { TransactionStatusService } from './transaction_status.service';
import { TransactionStatusController } from './transaction_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionStatus } from './entities/transaction_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionStatus])],
  controllers: [TransactionStatusController],
  providers: [TransactionStatusService],
})
export class TransactionStatusModule {}
