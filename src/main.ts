import { LazyModuleLoader, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('app');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const lazyModuleLoader = app.get(LazyModuleLoader);
  app.enableCors();
  await app.listen(3000);

  // for logging in docker
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
