import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


const express = require('express');
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('App documentation')
    .setDescription('documentació para al aplicación web de Matchbook')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  app.use(cors({
    origin: 'http://localhost:3002'&&'http://localhost:4000'
  }));
  await app.listen(3001);
}
bootstrap();
