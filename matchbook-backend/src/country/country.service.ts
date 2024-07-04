import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
    constructor(
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
    ) {}

    create(countryData: { name: string }): Promise<Country> {
        const country = this.countryRepository.create(countryData);
        return this.countryRepository.save(country);
    }

    findAll(): Promise<Country[]> {
        return this.countryRepository.find({ relations: ['addresses'] });
    }

    findOne(country_id: string): Promise<Country> {
        return this.countryRepository.findOne({ where: {country_id} , relations: ['addresses'] });
    }

    async update(country_id: string, countryData: { name: string }) {
        await this.countryRepository.update(country_id, countryData);
    }

    async remove(country_id: string): Promise<void> {
        await this.countryRepository.delete(country_id);
    }
}