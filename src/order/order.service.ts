import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    description: string;
    value: string;
    status: OrderStatus;
    clientId: number;
  }) {
    return this.prisma.order.create({
      data,
    });
  }

  findAll() {
    return this.prisma.order.findMany({
      include: { client: true },
    });
  }
}
