import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() book: Book) {
    return this.bookService.create(book);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':name_book')
  findOne(@Param('name_book') name_book: string) {
    return this.bookService.findOne(name_book);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() book: Book) {
    return this.bookService.update(+id, book);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}