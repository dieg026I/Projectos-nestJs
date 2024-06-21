import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    @Post()
    create(@Body() body: { name: string }) {
        return this.countryService.create(body);
    }

    @Get()
    findAll() {
        return this.countryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.countryService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body: { name: string }) {
        return this.countryService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.countryService.remove(id);
    }
}