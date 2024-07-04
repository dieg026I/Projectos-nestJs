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
    findOne(@Param('country_id') country_id: string) {
        return this.countryService.findOne(country_id);
    }

    @Patch(':id')
    update(@Param('country_id') country_id: string, @Body() body: { name: string }) {
        return this.countryService.update(country_id, body);
    }

    @Delete(':id')
    remove(@Param('country_id') country_id: string) {
        return this.countryService.remove(country_id);
    }
}