import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DrinkService } from './drink.service';
import { Drink } from './drink.model';
import { AuthMiddleware } from 'src/api/middleware/auth.middleware';

@Controller('api/v1/drinks')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @Get()
  @UseGuards(AuthMiddleware)
  async getAllDrinks(): Promise<Drink[]> {
    return this.drinkService.getAllDrinks();
  }

  @Post()
  async createDrink(@Body() drinkData: Drink): Promise<Drink> {
    return this.drinkService.createDrink(drinkData);
  }

  @Get(':id')
  async getDrink(@Param('id') id: number): Promise<Drink | null> {
    return this.drinkService.getDrink(Number(id));
  }

  @Delete(':id')
  async deleteDrink(@Param('id') id: number): Promise<Drink> {
    return this.drinkService.deleteDrink(Number(id));
  }

  @Put(':id')
  async updateDrink(
    @Param('id') id: number,
    @Body() drinkData: Drink,
  ): Promise<Drink> {
    return this.drinkService.updateDrink(Number(id), drinkData);
  }
}
