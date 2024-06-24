import { Test, TestingModule } from '@nestjs/testing';
import { TransactionStatusController } from './transaction_status.controller';
import { TransactionStatusService } from './transaction_status.service';

describe('TransactionStatusController', () => {
  let controller: TransactionStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionStatusController],
      providers: [TransactionStatusService],
    }).compile();

    controller = module.get<TransactionStatusController>(TransactionStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
