import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Drink } from './drink.model';

@Injectable()
export class DrinkService {
  constructor(private prisma: PrismaService) {}

  async getAllDrinks(): Promise<Drink[]> {
    return this.prisma.drink.findMany();
  }

  async getDrink(id: number): Promise<Drink | null> {
    return this.prisma.drink.findUnique({ where: { id } });
  }

  async createDrink(data: Drink): Promise<Drink> {
    return this.prisma.drink.create({ data });
  }

  async updateDrink(id: number, data: Drink): Promise<Drink> {
    return this.prisma.drink.update({
      where: { id },
      data: data,
    });
  }

  async deleteDrink(id: number): Promise<Drink> {
    return this.prisma.drink.delete({ where: { id } });
  }
}
