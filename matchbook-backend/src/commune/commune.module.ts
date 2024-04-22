import { Module } from '@nestjs/common';
import { CitiesService } from './commune.service';
import { CitiesController } from './commune.controller';
import { Cities } from './entities/cities.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cities])],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CommuneModule {}
