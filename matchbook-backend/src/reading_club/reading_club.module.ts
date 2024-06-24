import { Module } from '@nestjs/common';
import { ReadingClubService } from './reading_club.service';
import { ReadingClubController } from './reading_club.controller';
import { ReadingClub } from './entities/reading_club.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReadingClub])],
  controllers: [ReadingClubController],
  providers: [ReadingClubService],
})

export class ReadingClubModule {}
