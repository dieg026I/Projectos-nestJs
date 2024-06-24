import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() author: Author) {
    return this.authorService.create(author);
  }

  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @Get(':id_author')
  findOne(@Param('id_author') id_author: string) {
    return this.authorService.findOne(id_author);
  }

  @Put(':id_author')
  update(@Param('id_author') id_author: string, @Body() author: Author) {
    return this.authorService.update(id_author, author);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}