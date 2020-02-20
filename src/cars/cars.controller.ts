import { Controller, Post, Body, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { CarsService } from "./cars.service";
import { CreateCarDTO } from "./dto/car.dto";

@Controller('cars')
export class CarsController {
    constructor(private carsService: CarsService) { }

    /**
     * @api {post} /cars Create new car
     * @apiGroup Cars
     * @apiName New car
     * @apiVersion 0.1.0
     * 
     * @apiParam {String} name Car name
     * @apiParam {Number} price Car price
     * @apiParam {Manufacturer} [manufacturer] Car manufacturer
     * @apiParam {Date} [firstRegistrationDate] Car registration date
     * @apiParam {Owner[]} [owners] List of owners
     */
    @Post('/')
    async createCar(@Body() createCarDTO: CreateCarDTO) {
        return await this.carsService.createCar(createCarDTO)
    }

    /**
     * @api {get} /cars Get car list
     * @apiGroup Cars
     * @apiName Car list
     * @apiVersion 0.1.0
     */
    @Get('/')
    async getCars() {
        return await this.carsService.getCars();
    }

    /**
     * @api {get} /cars/:carId Get a single car
     * @apiGroup Cars
     * @apiName Show car
     * @apiVersion 0.1.0
     * 
     * @apiParam {ObjectId} id Car id
     * @apiParam {String=name,price,manufacturer} select field to show
     */
    @Get('/:carId')
    async getCar(@Param('carId') carId: string, @Query('select') select: string) {
        const car = await this.carsService.getCar(carId);
        const availableFields = ['name', 'price', 'manufacturer']

        if (select) {
            if (car[select] && availableFields.indexOf(select) != -1) {
                return car[select];
            } else {
                throw new NotFoundException(`You can't select this field - ${select}`)
            }
        }

        return car;
    }

    /**
     * @api {delete} /cars/:carId Delete existing car
     * @apiGroup Cars
     * @apiName Delete car
     * @apiVersion 0.1.0
     * 
     * @apiParam {ObjectId} carId Car ID
     */
    @Delete('/:carId')
    async deleteCar(@Param('carId') carId: string) {
        await this.carsService.deleteCar(carId);

        return {
            message: 'Car successfully deleted'
        };
    }

    /**
     * @api {put} /cars/:carId Update existing car
     * @apiGroup Cars
     * @apiName Update car
     * @apiVersion 0.1.0
     * 
     * @apiParam {String} name Car name
     * @apiParam {Number} price Car price
     * @apiParam {Manufacturer} [manufacturer] Car manufacturer
     * @apiParam {Date} [firstRegistrationDate] Car registration date
     * @apiParam {Owner[]} [owners] List of owners
     */
    @Put('/:carId')
    async updateCar(@Body() createCarDTO: CreateCarDTO, @Param('carId') carId: string) {
        return await this.carsService.updateCar(carId, createCarDTO);
    }

    /**
     * @api {post} /cars/refresh Remove old owners and apply discount to old cars
     * @apiGroup Cars
     * @apiName Refresh cars
     * @apiVersion 0.1.0
     */
    @Post('/refresh')
    async refresh() {
        const discount = 20
        const startMonthShift = 18
        const endMonthShift = 12

        let fromDate = new Date()
        let toDate = new Date()
        fromDate.setMonth(fromDate.getMonth() - startMonthShift)
        toDate.setMonth(toDate.getMonth() - endMonthShift)

        await this.carsService.removeOldOwners(fromDate)
        await this.carsService.applyDiscount(fromDate, toDate, (100 - discount) / 100)

        return await this.carsService.getCars();
    }
}
