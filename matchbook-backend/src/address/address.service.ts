import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  create(address: Address): Promise<Address> {
    return this.addressRepository.save(address);
  }

  findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  findOne(address_id: string): Promise<Address> {
    return this.addressRepository.findOne({where: {address_id}});
  }

  async update(address_id: string, addressData: any): Promise<Address> {
    await this.addressRepository.update(address_id, addressData);
    return this.addressRepository.findOne({where: {address_id}});
  }

  async remove(id: string): Promise<void> {
    await this.addressRepository.delete(id);
  }
}