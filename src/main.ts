// Dependencies
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Starts the application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
