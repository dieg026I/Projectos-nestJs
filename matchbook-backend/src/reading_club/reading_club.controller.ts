import { Controller, Post, UseInterceptors, UploadedFile, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file, @Body() readingClubData: Partial<ReadingClub>): Promise<ReadingClub> {
    const imageName = await this.readingClubService.saveImage(file.buffer, file.mimetype);
    readingClubData.image_club = imageName;
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
