import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Buy } from '../../buy/entities/buy.entity'; // Asegúrate de importar la entidad Buy

@Entity('shipment_type')
export class ShipmentType {
  @PrimaryColumn()
  id_type: string;

  @Column()
  name_type: string;

  @OneToMany(() => Buy, buy => buy.shipment_type)
  buys: Buy[];
}

