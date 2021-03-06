import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './infrastructure/http-exception.filter';
import { InternalExceptionFilter } from './infrastructure/internal-exception.filter';
import { ValidationErrorFilter } from './infrastructure/validation-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalFilters(
    new InternalExceptionFilter(),
    new ValidationErrorFilter(),
    new HttpExceptionFilter(),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('Nestjs project - mentoring')
    .setDescription('Demo back of mentoring project')
    .setVersion('1.0')
    .addTag('demo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(3000);
}
bootstrap();
