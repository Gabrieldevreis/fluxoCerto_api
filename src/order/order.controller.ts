import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private service: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Criar pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado' })
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos' })
  findAll() {
    return this.service.findAll();
  }
}
