import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { CarService } from "./car.service";
import { CreateCarDTO } from "./dto/car.dto";

@Controller('cars')
export class CarController {
    constructor(private carService: CarService) { }

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
    async createCar(@Res() res, @Body() createCarDTO: CreateCarDTO) {
        const car = await this.carService.createCar(createCarDTO)
        return res.status(HttpStatus.OK).json(car);
    }

    /**
     * @api {get} /cars Get car list
     * @apiGroup Cars
     * @apiName Car list
     * @apiVersion 0.1.0
     */
    @Get('/')
    async getCars(@Res() res) {
        const cars = await this.carService.getCars();
        return res.status(HttpStatus.OK).json(cars);
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
    async getCar(@Res() res, @Param('carId') carId, @Query('select') select) {
        const car = await this.carService.getCar(carId);
        const availableFields = ['name', 'price', 'manufacturer']

        if (select) {
            if (car[select] && availableFields.indexOf(select) != -1) {
                return res.status(HttpStatus.OK).json(car[select]);
            } else {
                throw new NotFoundException(`You can't select this field - ${select}`)
            }
        }

        return res.status(HttpStatus.OK).json(car);
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
    async deleteCar(@Res() res, @Param('carId') carId) {
        await this.carService.deleteCar(carId);

        return res.status(HttpStatus.OK).json({
            message: 'Car successfully deleted'
        });
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
    async updateCar(@Res() res, @Body() createCarDTO: CreateCarDTO, @Param('carId') carId) {
        const updatedCar = await this.carService.updateCar(carId, createCarDTO);
        return res.status(HttpStatus.OK).json(updatedCar);
    }

    /**
     * @api {post} /cars/refresh Remove old owners and apply discount to old cars
     * @apiGroup Cars
     * @apiName Refresh cars
     * @apiVersion 0.1.0
     */
    @Post('/refresh')
    async refresh(@Res() res) {
        const discount = 20
        const startMonthShift = 18
        const endMonthShift = 12

        let fromDate = new Date()
        let toDate = new Date()
        fromDate.setMonth(fromDate.getMonth() - startMonthShift)
        toDate.setMonth(toDate.getMonth() - endMonthShift)

        await this.carService.removeOldOwners(fromDate)
        await this.carService.applyDiscount(fromDate, toDate, (100 - discount) / 100)

        const cars = await this.carService.getCars();
        return res.status(HttpStatus.OK).json(cars);
    }
}
