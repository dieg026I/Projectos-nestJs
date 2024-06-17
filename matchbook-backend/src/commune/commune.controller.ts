import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { CitiesService } from './commune.service';
import { Cities } from './entities/cities.entity';
import { Region } from 'src/region/entities/region.entity';


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

  @Get('oneCity/:id_city')
  findOne(@Param('id_city') id_city: number) {
    return this.citiesService.findOne(id_city);
  }

  @Get('region/:regionId')
  getCitiesByRegion(@Param('regionId') regionId: number): Promise<Cities[]> {
    return this.citiesService.getCitiesByRegion(regionId);
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