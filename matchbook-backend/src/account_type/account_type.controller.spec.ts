import { Test, TestingModule } from '@nestjs/testing';
import { AccountTypeController } from './account_type.controller';
import { AccountTypeService } from './account_type.service';

describe('AccountTypeController', () => {
  let controller: AccountTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountTypeController],
      providers: [AccountTypeService],
    }).compile();

    controller = module.get<AccountTypeController>(AccountTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
