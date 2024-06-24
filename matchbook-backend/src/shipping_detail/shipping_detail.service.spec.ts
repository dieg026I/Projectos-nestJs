import { Test, TestingModule } from '@nestjs/testing';
import { ShippingDetailService } from './shipping_detail.service';

describe('ShippingDetailService', () => {
  let service: ShippingDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingDetailService],
    }).compile();

    service = module.get<ShippingDetailService>(ShippingDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
