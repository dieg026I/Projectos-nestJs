import { Module } from '@nestjs/common';
import { StatusSendService } from './status_send.service';
import { StatusSendController } from './status_send.controller';
import { StatusSend } from './entities/status_send.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StatusSend])],
  controllers: [StatusSendController],
  providers: [StatusSendService],
})
export class StatusSendModule {}
