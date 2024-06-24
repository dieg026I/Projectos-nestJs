import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('categoryOne/:id_category')
  findOne(@Param('id_category') id: string) {
    return this.categoryService.findOne(id);
  }


}
