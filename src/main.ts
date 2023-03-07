import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DatabaseInterceptor } from './common/errors/interceptors/database.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PORT } from './config/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Simple blog')
    .setDescription('The Simple Blog API description')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Filters
  app.useGlobalFilters(new HttpExceptionFilter());

  //Interceptors
  app.useGlobalInterceptors(new DatabaseInterceptor());

  await app.listen(PORT);
}
bootstrap();
