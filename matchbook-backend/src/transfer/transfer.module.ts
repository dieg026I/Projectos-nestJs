import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './entities/transfer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer])],
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
