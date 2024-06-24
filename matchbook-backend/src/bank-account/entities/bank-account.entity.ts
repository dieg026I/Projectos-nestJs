import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Bank } from '../../bank/entities/bank.entity';
import { AccountType } from '../../account_type/entities/account_type.entity';

@Entity({ name: 'bank_account' })
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  bank_account_id: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  number: string;

  @Column({ type: 'varchar', nullable: true })
  rut: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'boolean', default: false })
  default_bank_account: boolean;

  @ManyToOne(() => Users, user => user.bank_accounts)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Bank, bank => bank.bank_accounts)
  @JoinColumn({ name: 'bank_id' })
  bank: Bank;

  @ManyToOne(() => AccountType, accountType => accountType.bank_accounts)
  @JoinColumn({ name: 'account_type_id' })
  account_type: AccountType;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}

