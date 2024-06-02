import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { StatusSendService } from './status_send.service';
import { StatusSend } from './entities/status_send.entity';

@Controller('status_send')
export class StatusSendController {
  constructor(private readonly statusSendService: StatusSendService) {}

  @Post()
  create(@Body() statusSend: StatusSend) {
    return this.statusSendService.create(statusSend);
  }

  @Get()
  findAll() {
    return this.statusSendService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusSendService.findOnebyid(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() statusSend: StatusSend) {
    return this.statusSendService.update(id, statusSend);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusSendService.remove(id);
  }
}
