import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { StatusSend } from '../../status_send/entities/status_send.entity';
import { ShipmentType } from '../../shipment_type/entities/shipment_type.entity';
import { Publication } from '../../publication/entities/publication.entity';

@Entity('buy')
export class Buy {
  @PrimaryColumn()
  id_buy: string;

  @Column()
  date_buy: Date;

  @ManyToOne(() => StatusSend)
  @JoinColumn({ name: 'status_send_id_status' })
  status_send: StatusSend;

  @ManyToOne(() => ShipmentType)
  @JoinColumn({ name: 'shipment_type_id_type' })
  shipment_type: ShipmentType;

  @Column()
  total_buy: number;

  @ManyToOne(() => Publication)
  @JoinColumn({ name: 'publication_id_publication' })
  publication: Publication;
}