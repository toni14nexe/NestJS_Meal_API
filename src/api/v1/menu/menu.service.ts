import { PrismaService } from 'src/prisma.service';
import { Menu } from './menu.model.ts.js';
import { Injectable } from '@nestjs/common';

type GetMenusQuery = {
  page: number;
  perPage: number;
  sort: string;
  sortBy: string;
  filter: GetMenusFilter[];
};

type GetMenusFilter = {
  type: string;
};

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getMenus(query: GetMenusQuery): Promise<Menu[]> {
    return this.prisma.menu.findMany({
      take: query.perPage,
      skip: (query.page - 1) * query.perPage,
      where: { OR: query.filter },
      orderBy: [
        {
          [query.sortBy]: query.sort,
        },
      ],
    });
  }

  async getMenusCount(filters: GetMenusFilter[]): Promise<number> {
    return this.prisma.menu.count({ where: { OR: filters } });
  }

  async getMenu(id: number): Promise<Menu | null> {
    return this.prisma.menu.findUnique({ where: { id: Number(id) } });
  }

  async createMenu(data: Menu): Promise<Menu> {
    return this.prisma.menu.create({
      data,
    });
  }

  async updateMenu(id: number, data: Menu): Promise<Menu> {
    return this.prisma.menu.update({
      where: { id: Number(id) },
      data: data,
    });
  }

  async deleteMenu(id: number): Promise<Menu> {
    return this.prisma.menu.delete({
      where: { id: Number(id) },
    });
  }
}
