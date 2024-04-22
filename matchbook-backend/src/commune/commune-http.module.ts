import { Module } from '@nestjs/common';
import { CommuneModule } from './commune.module';
import { CitiesService } from './commune.service';
import { CitiesController } from './commune.controller';


@Module({
    
  imports: [CommuneModule],
  providers: [CitiesService],
  controllers: [CitiesController]})

export class CitiesHttpModule {}