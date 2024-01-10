import { LazyModuleLoader, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const lazyModuleLoader = app.get(LazyModuleLoader);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
