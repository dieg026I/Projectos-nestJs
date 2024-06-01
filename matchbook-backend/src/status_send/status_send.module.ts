import { Module } from '@nestjs/common';
import { StatusSendService } from './status_send.service';
import { StatusSendController } from './status_send.controller';

@Module({
  controllers: [StatusSendController],
  providers: [StatusSendService],
})
export class StatusSendModule {}
