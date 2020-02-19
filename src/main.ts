import dotenvConfig from 'dotenv/config'

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  dotenvConfig
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT);
  console.log('Server ran on port', process.env.PORT)
}
main();
