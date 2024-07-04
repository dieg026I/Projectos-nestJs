import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Address } from '../../address/entities/address.entity';

@Entity('countries')
export class Country {
    @PrimaryColumn()
    country_id: string;

    @Column({ type: 'varchar' })
    name: string;

}