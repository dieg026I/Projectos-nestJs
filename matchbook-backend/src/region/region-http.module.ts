import { Module } from '@nestjs/common';
import { RegionModule } from './region.module';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';

@Module({
  imports: [RegionModule],
  providers: [RegionService],
  controllers: [RegionController]
})
export class RegionHttpModule {}