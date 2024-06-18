import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionService } from './region.service';
import { Region } from './entities/region.entity';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  create(@Body() region: Region) {
    return this.regionService.create(region);
  }

  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @Get('oneRegion/:id_region')
  findOne(@Param('id_region') id: number) {
    return this.regionService.findOne(id);
  }

  @Patch(':id_region')
  update(@Param('id_region') id: number, @Body() region: Region) {
    return this.regionService.update(+id, region);
  }

  @Delete(':id_region')
  remove(@Param('id') id: number) {
    return this.regionService.remove(+id);
  }
}
