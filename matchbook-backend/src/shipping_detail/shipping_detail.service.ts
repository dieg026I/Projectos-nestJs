import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShippingDetail } from './entities/shipping_detail.entity';

@Injectable()
export class ShippingDetailService {
  constructor(
    @InjectRepository(ShippingDetail)
    private shippingDetailRepository : Repository<ShippingDetail>,
  ) {}

  findAll(): Promise<ShippingDetail[]> {
    return this.shippingDetailRepository.find();
  }

  findOne(shipping_detail_id: string): Promise<ShippingDetail> {
    return this.shippingDetailRepository.findOne({where: {shipping_detail_id}});
  }

  async create(shippingDetailData: ShippingDetail): Promise<ShippingDetail> {
    return this.shippingDetailRepository.save(shippingDetailData);
  }

  async update(id: string, updateData: Partial<ShippingDetail>): Promise<void> {
    await this.shippingDetailRepository.update(id, updateData);
  }

  async remove(id: string): Promise<void> {
    await this.shippingDetailRepository.delete(id);
  }
}
