import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publication } from './entities/publication.entity';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>,
  ) {}

  async createPublication(files: Express.Multer.File[]): Promise<Publication> {
    const publication = new Publication();
    publication.photo_showcase = files[0].path;
    publication.photo_cover = files[1].path;
    publication.photo_first_page = files[2].path;
    publication.photo_back_cover = files[3].path;
    
    await this.publicationRepository.save(publication);
    return publication;
  }
  
  findAll(): Promise<Publication[]> {
    return this.publicationRepository.find();
  }

  findOne(id_publication: string): Promise<Publication> {
    return this.publicationRepository.findOne({where : {id_publication}});
  }

  async remove(id: string): Promise<void> {
    await this.publicationRepository.delete(id);
  }
}