import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('transaction_status')
export class TransactionStatus {
    @PrimaryGeneratedColumn('uuid')
    transaction_status_id: string;

    @Column({ type: 'varchar', length: 20 })
    name: string;

    @Column('text')
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
