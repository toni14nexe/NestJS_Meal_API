import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Menu } from './menu.model.ts.js';
import { MenuService } from './menu.service.js';
import { Request, Response } from 'express';

@Controller('api/v1/menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenus(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const filterValues =
      request?.query?.filter?.length || request?.query?.filter === 'all'
        ? String(request?.query?.filter).split(',')
        : undefined;
    const filter = filterValues
      ? filterValues.map((type) => ({ type }))
      : undefined;

    const query = {
      page: Number(request?.query?.page) || 1,
      perPage: Number(request?.query?.perPage) || 10,
      sort: String(request?.query?.sort) || 'desc',
      sortBy: String(request?.query?.sortBy) || 'title',
      filter: filter,
    };

    const count = await this.menuService.getMenusCount(query.filter);
    const data = await this.menuService.getMenus(query);
    return response.status(200).json({
      total: count,
      ...query,
      data: data,
    });
  }

  @Post()
  async createMenu(@Body() menuData: Menu): Promise<Menu> {
    return this.menuService.createMenu(menuData);
  }

  @Get(':id')
  async getMenu(@Param('id') id: number): Promise<Menu | null> {
    return this.menuService.getMenu(id);
  }

  @Delete(':id')
  async deleteMenu(@Param('id') id: number): Promise<Menu> {
    return this.menuService.deleteMenu(id);
  }

  @Put(':id')
  async updateMenu(@Param('id') id: number, @Body() data: Menu): Promise<Menu> {
    return this.menuService.updateMenu(id, data);
  }
}
