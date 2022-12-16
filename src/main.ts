import { UseGuards, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AtGuard } from './auth/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // const reflector = new Reflector();
  // app.useGlobalGuards(new AtGuard());
  await app.listen(5000);
}
bootstrap();
