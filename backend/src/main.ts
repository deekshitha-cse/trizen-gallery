import { NestFactory } from '@nestjs/core';
import { HealthModule } from './health.module.js';

async function bootstrap() {
  const app = await NestFactory.create(HealthModule);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
