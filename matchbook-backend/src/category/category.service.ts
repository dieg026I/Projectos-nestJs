import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['books'] });
  }

  findOne(id_category : string): Promise<Category> {
    return this.categoryRepository.findOne({where: {id_category} });
  }

  // Otros métodos como create, update, delete...
}