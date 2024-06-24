import { Address } from 'src/address/entities/address.entity';
import { Cities } from 'src/commune/entities/cities.entity';
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('regions')
export class Region {
  @PrimaryColumn({name: 'id_region'})
  id_region: number;

  @Column({name: 'name'})
  name: string;

  @OneToMany(() => Cities, (city) => city.region)
  cities: Cities[];

  @OneToMany(() => Address, (address) => address.region)
  addresses: Address[];
  
}