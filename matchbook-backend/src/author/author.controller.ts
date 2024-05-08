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

  @Get(':name_author')
  findOne(@Param('name_author') name_author: string) {
    return this.authorService.findOne(name_author);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() author: Author) {
    return this.authorService.update(+id, author);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}