import { Test, TestingModule } from '@nestjs/testing';
import { StatusSendService } from './status_send.service';

describe('StatusSendService', () => {
  let service: StatusSendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusSendService],
    }).compile();

    service = module.get<StatusSendService>(StatusSendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
