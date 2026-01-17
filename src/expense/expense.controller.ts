// src/expense/expense.controller.ts
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Expense')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('expense')
export class ExpenseController {
  constructor(private service: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Criar despesa' })
  @ApiResponse({ status: 201, description: 'Despesa criada' })
  create(@Body() dto: CreateExpenseDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as despesas' })
  @ApiResponse({ status: 200, description: 'Lista de despesas' })
  findAll() {
    return this.service.findAll();
  }
}
