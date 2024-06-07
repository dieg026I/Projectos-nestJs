import { Test, TestingModule } from '@nestjs/testing';
import { ReadingClubService } from './reading_club.service';

describe('ReadingClubService', () => {
  let service: ReadingClubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadingClubService],
    }).compile();

    service = module.get<ReadingClubService>(ReadingClubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
