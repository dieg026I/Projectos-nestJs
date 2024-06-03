import { Module } from '@nestjs/common';
import { StatusSendService } from './status_send.service';
import { StatusSendController } from './status_send.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusSend } from './entities/status_send.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusSend])],
  controllers: [StatusSendController],
  providers: [StatusSendService],
})
export class StatusSendModule {}
