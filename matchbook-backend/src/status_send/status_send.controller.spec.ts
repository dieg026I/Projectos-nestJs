import { Test, TestingModule } from '@nestjs/testing';
import { StatusSendController } from './status_send.controller';
import { StatusSendService } from './status_send.service';

describe('StatusSendController', () => {
  let controller: StatusSendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusSendController],
      providers: [StatusSendService],
    }).compile();

    controller = module.get<StatusSendController>(StatusSendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
