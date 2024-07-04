import { Buy } from 'src/buy/entities/buy.entity';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Transfer } from 'src/transfer/entities/transfer.entity';

@Entity('status_send')
export class StatusSend {
  @PrimaryColumn()
  id_status: string;

  @Column()
  name_status: string;

  @OneToMany(() => Buy, buy => buy.status_send)
  buys: Buy[];

  @OneToMany(() => Transfer, (transfer) => transfer.statusSend)
    transfers: Transfer[];
}
