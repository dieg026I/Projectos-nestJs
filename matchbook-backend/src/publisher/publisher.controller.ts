import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { Publisher } from './entities/publisher.entity';

@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  create(@Body() publisher: Publisher) {
    return this.publisherService.create(publisher);
  }

  @Get()
  findAll() {
    return this.publisherService.findAll();
  }

  @Get(':name_publisher')
  findOne(@Param('name_publisher') name_publisher: string) {
    return this.publisherService.findOneForName(name_publisher);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() publisher: Publisher) {
    return this.publisherService.update(id, publisher);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publisherService.remove(id);
  }
}