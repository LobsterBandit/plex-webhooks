import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const port = process.env.PORT || 5050;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  logger.log(`Nest application listening on port ${port}`);
}
bootstrap();
