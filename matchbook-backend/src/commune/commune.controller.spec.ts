import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './commune.controller';
import { CitiesService } from './commune.service';

describe('CommuneController', () => {
  let controller: CitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [CitiesService],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
