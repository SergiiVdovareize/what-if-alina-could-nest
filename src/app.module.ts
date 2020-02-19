import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { CarModule } from './car/car.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true
    }),
    CarModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
