import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import { NestExpressApplication } from '@nestjs/platform-express';
import path, { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ['error', 'debug'],
  });
  app.useStaticAssets(join(__dirname, "../public"));
  const port = process.env.SERVER_PORT || 3001;
  await app.listen(port);
  log(`http://127.0.0.1:${port}`, process.env.NODE_ENV);
}
bootstrap();
