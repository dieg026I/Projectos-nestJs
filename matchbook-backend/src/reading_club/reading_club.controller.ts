import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ReadingClubService } from './reading_club.service';
import { ReadingClub } from './entities/reading_club.entity';

@Controller('reading-club')
export class ReadingClubController {
  constructor(private readonly readingClubService: ReadingClubService) {}

  @Get()
  findAll(): Promise<ReadingClub[]> {
    return this.readingClubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ReadingClub> {
    return this.readingClubService.findOne(id);
  }

  @Post()
  create(@Body() readingClubData: Partial<ReadingClub>): Promise<ReadingClub> {
    return this.readingClubService.create(readingClubData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() readingClubData: Partial<ReadingClub>): Promise<ReadingClub> {
    return this.readingClubService.update(id, readingClubData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.readingClubService.delete(id);
  }
}
