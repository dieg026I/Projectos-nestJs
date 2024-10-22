
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entities/user.entity';
import { CommuneModule } from './commune/commune.module';
import { RegionModule } from './region/region.module';
import { Cities } from './commune/entities/cities.entity';
import { Region } from './region/entities/region.entity';
import { JwtModule } from '@nestjs/jwt';
import { BookModule } from './book/book.module';
import { Book } from './book/entities/book.entity';
import { AuthorModule } from './author/author.module';
import { PublisherModule } from './publisher/publisher.module';
import { Author } from './author/entities/author.entity';
import { Publisher } from './publisher/entities/publisher.entity';
import { PublicationModule } from './publication/publication.module';
import { CategoryModule } from './category/category.module';
import { Publication } from './publication/entities/publication.entity';
import { Category } from './category/entities/category.entity';
import { BuyModule } from './buy/buy.module';
import { StatusSendModule } from './status_send/status_send.module';
import { ShipmentTypeModule } from './shipment_type/shipment_type.module';
import { ReadingClubModule } from './reading_club/reading_club.module';
import { Buy } from './buy/entities/buy.entity';
import { ShipmentType } from './shipment_type/entities/shipment_type.entity';
import { StatusSend } from './status_send/entities/status_send.entity';
import { ReadingClub } from './reading_club/entities/reading_club.entity';
import { ShoppingCartModule } from './shopping_cart/shopping_cart.module';
import { ShoppingCart } from './shopping_cart/entities/shopping_cart.entity';
import { AddressModule } from './address/address.module';
import { CountryModule } from './country/country.module';
import { Country } from './country/entities/country.entity';
import { Address } from './address/entities/address.entity';
import { TransactionStatusModule } from './transaction_status/transaction_status.module';
import { TransactionStatus } from './transaction_status/entities/transaction_status.entity';
import { BankAccountModule } from './bank-account/bank-account.module';
import { ShippingDetailModule } from './shipping_detail/shipping_detail.module';
import { BankModule } from './bank/bank.module';
import { AccountTypeModule } from './account_type/account_type.module';
import { ShippingDetail } from './shipping_detail/entities/shipping_detail.entity';
import { BankAccount } from './bank-account/entities/bank-account.entity';
import { Bank } from './bank/entities/bank.entity';
import { AccountType } from './account_type/entities/account_type.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '222648',
    database: 'Matchbook_DB',
    entities: [Users, Cities, Region, Book, Author, Publisher,
    Publication, Category, Buy, ShipmentType, StatusSend, ReadingClub,
     ShoppingCart, Country, Address, TransactionStatus, ShippingDetail,
    BankAccount, Bank, AccountType],
    synchronize: false, // Solo para entornos de desarrollos
    autoLoadEntities: false,
    logging: true
  }),RegionModule,CommuneModule, UsersModule, AuthModule,
    JwtModule.register({
    secret: 'secretKey', 
    signOptions: { expiresIn: '60m' }
  }),
    BookModule,
    AuthorModule,
    PublisherModule,
    PublicationModule,
    CategoryModule,
    BuyModule,
    StatusSendModule,
    ShipmentTypeModule,
    ReadingClubModule,
    ShoppingCartModule,
    AddressModule,
    CountryModule,
    TransactionStatusModule,
    BankAccountModule,
    ShippingDetailModule,
    BankModule,
    AccountTypeModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
