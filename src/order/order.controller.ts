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
import { OrderService } from './order.service';
import { Request, Response } from 'express';
import { Order } from './order.model';

@Controller('api/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.orderService.getAllOrders();
    return response.status(200).json({
      data: result,
    });
  }

  @Post()
  async createOrder(@Body() orderData: Order): Promise<Order> {
    return this.orderService.createOrder(orderData);
  }

  @Get(':id')
  async getOrder(@Param('id') id: number): Promise<Order | null> {
    return this.orderService.getOrder(id);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<Order> {
    return this.orderService.deleteOrder(id);
  }
}
