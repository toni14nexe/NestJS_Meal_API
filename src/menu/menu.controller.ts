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
import { Menu } from './menu.model.ts';
import { MenuService } from './menu.service';
import { Request, Response } from 'express';

@Controller('api/v1/menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getAllMenu(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.menuService.getAllMenus();
    return response.status(200).json({
      data: result,
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
