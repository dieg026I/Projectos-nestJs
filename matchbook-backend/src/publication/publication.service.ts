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

  async createPublication(files: Express.Multer.File[], id_publication: string, rut_user: number, id_book: string): Promise<Publication> {
    const publication = new Publication();
    publication.id_publication = id_publication;
    publication.user_rut_user= rut_user;
    publication.book_id_book = id_book;
    publication.date_publication = new Date();
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

  FindWhithBook(): Promise<Publication[]>{
    return this.publicationRepository.find({ relations: ['book'] })
  }

  async remove(id: string): Promise<void> {
    await this.publicationRepository.delete(id);
  }
}