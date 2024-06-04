import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publication } from './entities/publication.entity';
import { Users } from 'src/users/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>,
  ) {}

  async createPublication(files: Express.Multer.File[], id_publication: string, rut_user: number, id_book: string, cost_book: number) : Promise<Publication> {
    const publication = new Publication();
    publication.id_publication = id_publication;
    publication.user_rut_user= rut_user;
    publication.book_id_book = id_book;
    publication.date_publication = new Date();
    publication.photo_showcase = files[0].filename;
    publication.photo_cover = files[1].filename;
    publication.photo_first_page = files[2].filename;
    publication.photo_back_cover = files[3].filename;
    publication.cost_book = cost_book;
    
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

  findAllWithBooks(): Promise<Publication[]> {
    return this.publicationRepository.find({ relations: ['book'] })
      .catch(error => {
        console.error('Error fetching publications with books:', error);
        throw error;
      });
  }
}