// src/income/income.controller.ts
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Income')           // Grupo no Swagger
@ApiBearerAuth()              // JWT
@UseGuards(JwtAuthGuard)     // Protege a rota
@Controller('income')
export class IncomeController {
  constructor(private service: IncomeService) {}

  @Post()
  @ApiOperation({ summary: 'Criar receita' })
  @ApiResponse({ status: 201, description: 'Receita criada' })
  create(@Body() dto: CreateIncomeDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as receitas' })
  @ApiResponse({ status: 200, description: 'Lista de receitas' })
  findAll() {
    return this.service.findAll();
  }
}
