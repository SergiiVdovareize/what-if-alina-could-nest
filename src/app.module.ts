import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { CarsModule } from './cars/cars.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'docs'),
    }),
    CarsModule
  ],
  controllers: [AppController]
})

export class AppModule {}
