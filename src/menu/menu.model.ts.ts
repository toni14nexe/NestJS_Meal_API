import { Prisma } from '@prisma/client';

export class Menu implements Prisma.MenuCreateInput {
  id?: number;
  title: string;
  description?: string;
  starter?: string;
  desert?: string;
  price: number;
  imageUrl?: string;
  drinksIds?: number[];
}
