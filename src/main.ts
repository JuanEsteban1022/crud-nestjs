import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Corresponde al Dto
      forbidNonWhitelisted: true, // Presenta el error al cliente
      transform: true,
    })
  );

  await app.listen(3000);
}
bootstrap();
