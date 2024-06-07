import { Test, TestingModule } from '@nestjs/testing';
import { ReadingClubController } from './reading_club.controller';
import { ReadingClubService } from './reading_club.service';

describe('ReadingClubController', () => {
  let controller: ReadingClubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReadingClubController],
      providers: [ReadingClubService],
    }).compile();

    controller = module.get<ReadingClubController>(ReadingClubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
