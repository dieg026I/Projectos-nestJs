import { Buy } from 'src/buy/entities/buy.entity';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity('status_send')
export class StatusSend {
  @PrimaryColumn()
  id_status: string;

  @Column()
  name_status: string;

  @OneToMany(() => Buy, buy => buy.status_send)
  buys: Buy[];
}
