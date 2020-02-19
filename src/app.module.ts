import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { CarModule } from './car/car.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'docs'),
    }),
    CarModule
  ],
  controllers: [AppController]
})

export class AppModule {}
