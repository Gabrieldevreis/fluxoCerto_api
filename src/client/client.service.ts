import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateClientDto) {
    return this.prisma.client.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        status: 'OKAY',
      },
    });
  }

  findAll() {
    return this.prisma.client.findMany({
      include: { order: true }, // traz os pedidos do cliente
    });
  }
}

