import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Address } from '../../address/entities/address.entity'; // Asegúrate de tener esta entidad creada

@Entity('shipping_detail')
export class ShippingDetail {
  @PrimaryColumn({ type: 'varchar' })
  shipping_detail_id: string;

  @Column({ type: 'smallint', nullable: true })
  shipping_type: number;

  @Column({ type: 'varchar', nullable: true })
  dispatch_office: string;

  @Column({ type: 'varchar', nullable: true })
  tracking_number: string;

  @Column({ type: 'varchar', nullable: true })
  tracking_reference: string;

  @Column({ type: 'int', nullable: true })
  shipping_price: number;

  @Column({ type: 'json', nullable: true })
  package: object;

  @ManyToOne(() => Address, address => address.shipping_details_buyer)
  @JoinColumn({ name: 'buyer_address_id' })
  buyer_address: Address;

  @Column()
  buyer_address_id: string;

  @ManyToOne(() => Address, address => address.shipping_details_seller)
  @JoinColumn({ name: 'seller_address_id' })
  seller_address: Address;

  @Column()
  seller_address_id: string;

  @Column({ type: 'json', nullable: true })
  branch_info: object;

  @Column({ type: 'json', nullable: true })
  who_withdraws: object;

  @Column({ type: 'boolean', default: false })
  seller_delivery_confirmation: boolean;

  @Column({ type: 'boolean', default: true })
  buyer_delivery_confirmation: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}