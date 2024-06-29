import { Controller, Get, Param, Delete, Post, UseInterceptors, UploadedFile, UploadedFiles, Body, Put, Query } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { Publication } from './entities/publication.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get()
  findAll(): Promise<Publication[]> {
    return this.publicationService.findAll();
  }

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

  @Get('search/:term')
  search(@Param('term') term: string): Promise<Publication[]> {
    return this.publicationService.search(term);
  }
  
  @Get('onePublication/:id')
  findOne(@Param('id') id: string): Promise<Publication> {
    return this.publicationService.findOne(id);
  }

  @Get('findByFilters')
  async findByFilters(
    @Query('region') region?: string,
    @Query('city') city?: string,
    @Query('category') category?: string[],
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number

  ) {
    const filters = { region, city, category, minPrice, maxPrice };
    return await this.publicationService.findByFilters(filters);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.publicationService.remove(id);
  }


  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<Publication>): Promise<Publication> {
      return this.publicationService.update(id, updateData);
  }

}


