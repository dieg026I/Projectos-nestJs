
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '95809580Dd',
    database: 'Matchbook_BD',
    entities: [Users, Cities, Region, Book, Author, Publisher],
    synchronize: false, // Solo para entornos de desarrollo
    autoLoadEntities: false,
  }),RegionModule,CommuneModule, UsersModule, AuthModule,
     JwtModule.register({
     secret: 'secretKey', 
     signOptions: { expiresIn: '60m' }
  }),
     BookModule,
     AuthorModule,
     PublisherModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
