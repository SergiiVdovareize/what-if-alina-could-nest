import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { CarService } from "./car.service";
import { CreateCarDTO } from "./dto/car.dto";

@Controller('car')
export class CarController {
    constructor(private carService: CarService) { }

    @Post('/')
    async createCar(@Res() res, @Body() createCarDTO: CreateCarDTO) {
        const car = await this.carService.createCar(createCarDTO)
        return res.status(HttpStatus.OK).json(car);
    }

    @Get('/')
    async getCars(@Res() res) {
        const cars = await this.carService.getCars();
        return res.status(HttpStatus.OK).json(cars);
    }

    @Get('/:carId')
    async getCar(@Res() res, @Param('carId') carId, @Query('select') select) {
        const car = await this.carService.getCar(carId);
        const availableFields = ['name', 'price', 'manufacturer', 'owners']

        if (select) {
            if (car[select] && availableFields.indexOf(select) != -1) {
                return res.status(HttpStatus.OK).json(car[select]);
            } else {
                throw new NotFoundException(`You can't select this field - ${select}`)
            }
        }

        return res.status(HttpStatus.OK).json(car);
    }

    @Delete('/:carId')
    async deleteCar(@Res() res, @Param('carId') carId) {
        await this.carService.deleteCar(carId);

        return res.status(HttpStatus.OK).json({
            message: 'Car successfully deleted'
        });
    }

    @Put('/:carId')
    async updateCar(@Res() res, @Body() createCarDTO: CreateCarDTO, @Param('carId') carId) {
        const updatedCar = await this.carService.updateCar(carId, createCarDTO);
        return res.status(HttpStatus.OK).json(updatedCar);
    }

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
