import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Cities } from 'src/commune/entities/cities.entity';
import { Publication } from 'src/publication/entities/publication.entity';


@Entity('users')
export class Users {
  @PrimaryColumn()
  rut_user: number;

  @Column()
  dv_user: string;

  @Column()
  name_user: string;
  
  @Column()
  lastname_user: string;

  @Column()
  email_user: string;

  @Column()
  phone_user: number;

  @Column()
  password_users: string;
  
  @Column()
  photo_user: string;

  @ManyToOne(() => Cities, (city) => city.users)
  @JoinColumn({ name: 'city_id' })
  city_id: number;

  @OneToMany(() => Publication, publication => publication.user)
  publications: Publication[];


}


