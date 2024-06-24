import { Test, TestingModule } from '@nestjs/testing';
import { ShippingDetailController } from './shipping_detail.controller';
import { ShippingDetailService } from './shipping_detail.service';

describe('ShippingDetailController', () => {
  let controller: ShippingDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingDetailController],
      providers: [ShippingDetailService],
    }).compile();

    controller = module.get<ShippingDetailController>(ShippingDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
