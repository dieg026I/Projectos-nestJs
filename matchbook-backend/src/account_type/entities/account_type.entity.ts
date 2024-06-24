import { BankAccount } from 'src/bank-account/entities/bank-account.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('account_type')
export class AccountType {
  @PrimaryGeneratedColumn('uuid')
  account_type_id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => BankAccount, bankAccount => bankAccount.account_type)
  bank_accounts : BankAccount[];
}