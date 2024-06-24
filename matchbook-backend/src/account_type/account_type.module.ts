import { Module } from '@nestjs/common';
import { AccountTypeService } from './account_type.service';
import { AccountTypeController } from './account_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountType } from './entities/account_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountType])],
  controllers: [AccountTypeController],
  providers: [AccountTypeService],
})
export class AccountTypeModule {}
