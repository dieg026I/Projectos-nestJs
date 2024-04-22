import { Cities } from 'src/commune/entities/cities.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('regions')
export class Region {
  @PrimaryGeneratedColumn({name: 'id_region'})
  id_region: number;

  @Column({name: 'name'})
  name_region: string;

  @OneToMany(() => Cities, (city) => city.region)
  cities: Cities[];
}