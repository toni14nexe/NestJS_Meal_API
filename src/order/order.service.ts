import { PrismaService } from 'src/prisma.service';
import { Order } from './order.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAllOrders(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async getOrder(id: number): Promise<Order | null> {
    return this.prisma.order.findUnique({ where: { id: Number(id) } });
  }

  async createOrder(data: Order): Promise<Order> {
    return this.prisma.order.create({
      data,
    });
  }

  async deleteOrder(id: number): Promise<Order> {
    return this.prisma.order.delete({
      where: { id: Number(id) },
    });
  }
}
