import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Address } from '../../address/entities/address.entity';

@Entity('countries')
export class Country {
    @PrimaryGeneratedColumn()
    id_country: number;

    @Column({ type: 'varchar' })
    name: string;

    @OneToMany(() => Address, address => address.country)
    addresses: Address[];
}