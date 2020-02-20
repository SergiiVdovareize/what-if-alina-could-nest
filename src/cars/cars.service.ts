import { Injectable, NotFoundException } from '@nestjs/common';

import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { ICar } from "./interfaces/car.interface";
import { CreateCarDTO } from "./dto/car.dto";

@Injectable()
export class CarsService {
    constructor(@InjectModel('Car') private readonly carModel: Model<ICar>) {}

    async getCars(): Promise<ICar[]> {
        return await this.carModel.find();
    }
    
    async getCar(carId: string): Promise<ICar> {
        return await this.findCar(carId); 
    }

    async createCar(createCarDTO: CreateCarDTO): Promise<ICar> {
        const newCar = new this.carModel(createCarDTO);
        return newCar.save();
    }

    async updateCar(carId: string, createCarDTO: CreateCarDTO): Promise<ICar> {
        const foundCar = await this.findCar(carId);
        await foundCar.update(createCarDTO, {new:true});
        return await this.findCar(carId);
    }
    
    async deleteCar(carId: string): Promise<any> {
        const foundCar = await this.findCar(carId);
        return await foundCar.remove()
    }

    async applyDiscount(fromDate: Date, toDate: Date, factor: number) {
        this.carModel.updateMany(
            {firstRegistrationDate: {
                $gte: fromDate,
                $lt: toDate
            }},
            {$mul: {price: factor}},
            this.errorHandler)
    }

    async removeOldOwners(lastDate: Date) {
        this.carModel.updateMany(
            {},
            {$pull: {owners: {purchaseDate: {$lt: lastDate}}}},
            this.errorHandler
        )
    }

    private async findCar(carId: string): Promise<ICar> {
        const foundCar = await this.carModel.findById(carId); 
        if (!foundCar) throw new NotFoundException('Car does not exist');
        return foundCar
    }

    private errorHandler(error: any) {
        console.log(error)
    }
}
