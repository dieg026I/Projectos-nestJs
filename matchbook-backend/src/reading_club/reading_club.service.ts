import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadingClub } from './entities/reading_club.entity';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class ReadingClubService {
  constructor(
    @InjectRepository(ReadingClub)
    private readingClubRepository: Repository<ReadingClub>,
  ) {}

  async saveImage(imageBuffer: Buffer, mimetype: string): Promise<string> {
    const imageName = uuidv4(); // Genera un nombre único para la imagen
    const path = `C:\\Users\\dieg0\\OneDrive\\Documentos\\Projectos-nestJs\\images${imageName}`;
    // Guarda la imagen en el almacenamiento local
    fs.writeFileSync(path, imageBuffer);
      return imageName;
  }
  
  async updateImage(id_club: string, imageBuffer: Buffer, mimetype: string): Promise<ReadingClub> {
    const imageName = await this.saveImage(imageBuffer, mimetype);

    // Actualiza el nombre de la imagen en la base de datos
    const readingClub = await this.readingClubRepository.findOne({where:{id_club}});
    readingClub.image_club = imageName;
    return this.readingClubRepository.save(readingClub);
  }

  async findAll(): Promise<ReadingClub[]> {
    return this.readingClubRepository.find({ relations: ['book','book.author_id_author', 'book.publisher_id_publisher', 'book.categories'] });
  }

  async findOne(id_club: string): Promise<ReadingClub> {
    return this.readingClubRepository.findOne({ where: { id_club }, relations: ['book'] });
  }

  async create(readingClubData: Partial<ReadingClub>): Promise<ReadingClub> {
    const readingClub = this.readingClubRepository.create(readingClubData);
    return this.readingClubRepository.save(readingClub);
  }

  async update(id_club: string, readingClubData: Partial<ReadingClub>): Promise<ReadingClub> {
    await this.readingClubRepository.update(id_club, readingClubData);
    return this.readingClubRepository.findOne({ where: { id_club } });

  }

  async delete(id: string): Promise<void> {
    await this.readingClubRepository.delete(id);
  }

}