
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Region } from '../../region/entities/region.entity';
import { Users } from 'src/users/entities/user.entity';
import { clear } from 'console';

@Entity('cities')
export class Cities {
  
  @PrimaryColumn()
  id_city: number;

  @Column()
  name: string;
  
  @OneToMany(() => Users, (user) => user.city_id)
  users: Users[];

  @ManyToOne(() => Region, (region) => region.cities)
  @JoinColumn({ name: 'id_region' })
  region: Region;
  

}


