import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './schemas/car.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Car', schema: CarSchema}])],
  providers: [CarService],
  controllers: [CarController]
})

export class CarModule {}
