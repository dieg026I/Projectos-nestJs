import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { Publication } from './entities/publication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Publication])],
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}
