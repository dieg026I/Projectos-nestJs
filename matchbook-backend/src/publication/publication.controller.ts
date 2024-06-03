import { Controller, Get, Param, Delete, Post, UseInterceptors, UploadedFile, UploadedFiles, Body } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { Publication } from './entities/publication.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';
@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('images', 4, multerConfig))
  async uploadFiles(@UploadedFiles() files, @Body() body) {
    const { id_publication, rut_user, id_book, cost_book } = body;
    const publication = await this.publicationService.createPublication(files, id_publication, rut_user, id_book, cost_book);
    return publication;
  }
  
  @Get('publication')
  findAllPublication() {
    return this.publicationService.findAllWithBooks();
  }
  
  @Get()
  findAll(): Promise<Publication[]> {
    return this.publicationService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Publication> {
    return this.publicationService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.publicationService.remove(id);
  }


}

