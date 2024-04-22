import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CitiesService } from './commune.service';
import { Cities } from './entities/cities.entity';


@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  create(@Body() commune: Cities) {
    return this.citiesService.create(commune);
  }

  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.citiesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() city: Cities) {
    return this.citiesService.update(id, city);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.citiesService.remove(id);
}

}