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

  async updateStatus(orderId: number, status: OrderStatus) {
    // Atualizar o status do pedido
    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: { client: true },
    });

    // Se o pedido foi marcado como pago, verificar se o cliente ainda tem pedidos não pagos
    if (status === 'PAY') {
      const clientId = updatedOrder.clientId;
      const unpaidOrders = await this.prisma.order.findMany({
        where: {
          clientId,
          status: 'NO_PAY',
        },
      });

      // Se não há mais pedidos não pagos, atualizar o status do cliente para OKAY
      if (unpaidOrders.length === 0) {
        await this.prisma.client.update({
          where: { id: clientId },
          data: { status: 'OKAY' },
        });
      }
    } else if (status === 'NO_PAY') {
      // Se o pedido foi marcado como não pago, atualizar o cliente para NO_OKAY
      await this.prisma.client.update({
        where: { id: updatedOrder.clientId },
        data: { status: 'NO_OKAY' },
      });
    }

    return updatedOrder;
  }
}
