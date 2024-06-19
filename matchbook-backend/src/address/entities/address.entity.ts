import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from '../../country/entities/country.entity';
import { Cities } from '../../commune/entities/cities.entity';
import { Users } from '../../users/entities/user.entity';
import { Region } from '../../region/entities/region.entity';

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn('uuid')
    address_id: string;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    street: string;

    @Column({ type: 'int', nullable: true })
    house_number: number;

    @Column({ type: 'varchar', nullable: true })
    extra_details: string;

    @Column({ type: 'int', nullable: true })
    postal_code: number;

    @Column({ type: 'varchar', length: 35, nullable: true })
    phone_number: string;

    @Column({ type: 'boolean', nullable: true })
    default_address: boolean;

    @ManyToOne(() => Country, (country) => country.addresses)
    @JoinColumn({ name: 'country_id' })
    country: Country;

    country_id : number;

    @ManyToOne(() => Region, (region) => region.addresses)
    @JoinColumn({ name: 'region_id' })
    region: Region;

    region_id : number;

    @ManyToOne(() => Cities, (city) => city.addresses)
    @JoinColumn({ name: 'city_id' })
    city: Cities;

    city_id : number;

    @ManyToOne(() => Users, (user) => user.addresses)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    user_id : number;

    @Column({ type: 'boolean', nullable: true })
    is_dev: boolean;

    @Column({ type: 'timestamp', nullable: true })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;
}

