import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';


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

  // Configuración de CORS
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:3002', 'http://localhost:4000'];
      // Permitir solicitudes sin 'origin' (como aplicaciones móviles o `curl` requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'La política de CORS para este sitio no permite el acceso desde el origen especificado.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  });

  await app.listen(3001);
}
bootstrap();