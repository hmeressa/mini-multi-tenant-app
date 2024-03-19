import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked'; // Import the function for initializing the transactional context

async function bootstrap() {
  initializeTransactionalContext(); // Initialize the transactional context
  const app = await NestFactory.create(AppModule);
  await app.setGlobalPrefix("/api/v1");
  await app.listen(3000);
}
bootstrap();
