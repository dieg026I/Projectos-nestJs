import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Country } from '../../country/entities/country.entity';
import { Cities } from '../../commune/entities/cities.entity';
import { Users } from '../../users/entities/user.entity';
import { Region } from '../../region/entities/region.entity';
import { ShippingDetail } from 'src/shipping_detail/entities/shipping_detail.entity';

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
    
    @Column()
    user_id : number;

    @OneToMany(() => ShippingDetail, (shippingDetail) => shippingDetail.buyer_address)
    shipping_details_buyer : Address[];

  

    @OneToMany(() => ShippingDetail, (shippingDetail) => shippingDetail.seller_address)
    shipping_details_seller : Address[];

   

    @Column({ type: 'boolean', nullable: true })
    is_dev: boolean;

    @Column({ type: 'timestamp', nullable: true })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;
}

