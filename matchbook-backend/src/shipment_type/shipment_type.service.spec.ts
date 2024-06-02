import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentTypeService } from './shipment_type.service';

describe('ShipmentTypeService', () => {
  let service: ShipmentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipmentTypeService],
    }).compile();

    service = module.get<ShipmentTypeService>(ShipmentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
