
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Publication } from '../../publication/entities/publication.entity';
import { StatusSend } from '../../status_send/entities/status_send.entity';
import { ShipmentType } from '../../shipment_type/entities/shipment_type.entity';

@Entity('transfer')
export class Transfer {
    @PrimaryGeneratedColumn('uuid')
    transaction_id: string;

    @Column({ nullable: true })
    id_publication: string;

    @Column({ nullable: true })
    name_book: string;

    @Column({ nullable: true })
    username_buyer: string;

    @Column({ nullable: true })
    username_seller: string;

    @Column()
    id_status_send: string;

    @Column({ nullable: true })
    id_type_send: string;

    @Column()
    total: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Publication, publication => publication.transfers)
    @JoinColumn({ name: 'id_publication' })
    publication: Publication;

    @ManyToOne(() => StatusSend, statusSend  => statusSend.transfers)
    @JoinColumn({ name: 'id_status_send' })
    statusSend: StatusSend;

    @ManyToOne(() => ShipmentType, shipmentType => shipmentType.transfers)
    @JoinColumn({ name: 'id_type_send' })
    shipment_type: ShipmentType;
}