
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Region } from '../../region/entities/region.entity';
import { Users } from 'src/users/entities/user.entity';
import { clear } from 'console';
import { Address } from 'src/address/entities/address.entity';

@Entity('cities')
export class Cities {
  
  @PrimaryColumn()
  id_city: number;

  @Column()
  name: string;
  
  @OneToMany(() => Users, (user) => user.cities)
  users: Users[];

  @ManyToOne(() => Region, (region) => region.cities)
  @JoinColumn({ name: 'id_region' })
  region: Region;
  
  @OneToMany(() => Address, (address) => address.city)
  addresses: Address[];

}


