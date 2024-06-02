import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentTypeController } from './shipment_type.controller';
import { ShipmentTypeService } from './shipment_type.service';

describe('ShipmentTypeController', () => {
  let controller: ShipmentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipmentTypeController],
      providers: [ShipmentTypeService],
    }).compile();

    controller = module.get<ShipmentTypeController>(ShipmentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
