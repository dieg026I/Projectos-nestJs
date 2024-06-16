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

  @Get('oneBook/:id')
  findOne(@Param('id_book') id_book: string) {
    return this.bookService.findOnebyid(id_book);
  }

  @Put(':id_book')
  update(@Param('id_book') id_book: string, @Body() book: Book) {
    return this.bookService.update(id_book, book);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}