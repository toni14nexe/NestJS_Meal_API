import { PrismaService } from 'src/prisma.service';
import { Menu } from './menu.model.ts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getAllMenu(): Promise<Menu[]> {
    return this.prisma.menu.findMany();
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
      data: { title: data.title, description: data.description },
    });
  }

  async deleteMenu(id: number): Promise<Menu> {
    return this.prisma.menu.delete({
      where: { id: Number(id) },
    });
  }
}