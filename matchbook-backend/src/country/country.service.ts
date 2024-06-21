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

    findOne(id_country: number): Promise<Country> {
        return this.countryRepository.findOne({ where: {id_country} , relations: ['addresses'] });
    }

    async update(id_country: number, countryData: { name: string }) {
        await this.countryRepository.update(id_country, countryData);
      
    }

    async remove(id: number): Promise<void> {
        await this.countryRepository.delete(id);
    }
}