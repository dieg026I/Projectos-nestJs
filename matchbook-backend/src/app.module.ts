
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '222648',
    database: 'Matchbook_DB',
    entities: [Users, Cities, Region, Book, Author, Publisher, Publication, Category],
    synchronize: false, // Solo para entornos de desarrollo
    autoLoadEntities: false,
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
    ShipmentTypeModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
