import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Initialise a Swagger config to structure a base document
  // that conforms to the OpenAPI Specification.
  const config = new DocumentBuilder()
    .setTitle('NestJS API Documentation')
    .setDescription(`Description:
    NestJS API to search a product data by its barcode on an open-source API - Open-food-facts API.`
    )
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'Token'
    )
    .build();

  // Initialise Swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/doc', app, document);

  // Set-up validation pipe to be global-scoped
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
