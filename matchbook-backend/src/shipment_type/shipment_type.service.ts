import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShipmentType } from './entities/shipment_type.entity';

@Injectable()
export class ShipmentTypeService {
  constructor(
    @InjectRepository(ShipmentType)
    private shipmentTypeRepository: Repository<ShipmentType>,
  ) {}

  create(shipmentType: ShipmentType) {
    return this.shipmentTypeRepository.save(shipmentType);
  }

  findAll() {
    return this.shipmentTypeRepository.find();
  }

  findOnebyid(id_type: string) {
    return this.shipmentTypeRepository.findOne({where: {id_type}});
  }

  update(id: string, shipmentType: ShipmentType) {
    return this.shipmentTypeRepository.update(id, shipmentType);
  }

  remove(id: string) {
    return this.shipmentTypeRepository.delete(id);
  }
}
