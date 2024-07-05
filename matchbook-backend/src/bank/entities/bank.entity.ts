import { BankAccount } from 'src/bank-account/entities/bank-account.entity';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity('bank')
export class Bank {
  @PrimaryColumn({ type: 'varchar' })
  code_sbif: string;

  @Column({ type: 'varchar' })
  name_bank: string;
  
  @OneToMany(() => BankAccount, bankAccount => bankAccount.bank)
  bank_accounts: BankAccount[];
  
}

