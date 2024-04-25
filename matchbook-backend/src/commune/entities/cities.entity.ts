
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Region } from '../../region/entities/region.entity';
import { Users } from 'src/users/entities/user.entity';

@Entity('cities')
export class Cities {
  
  @PrimaryGeneratedColumn()
  id_city: number;

  @Column()
  name: string;
  
  @OneToMany(() => Users, (user) => user.city)
  users: Users[];

  @ManyToOne(() => Region, (region) => region.cities)
  @JoinColumn({ name: 'id_region' })
  region: Region;
  

}


