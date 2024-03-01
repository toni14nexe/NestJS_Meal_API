import { Prisma } from '@prisma/client';

export class Drink implements Prisma.DrinkCreateInput {
  id?: number;
  title: string;
  imageUrl?: string;
}
