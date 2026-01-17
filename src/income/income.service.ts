// src/income/income.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIncomeDto } from './dto/create-income.dto';

@Injectable()
export class IncomeService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateIncomeDto) {
    return this.prisma.income.create({
      data: {
        description: dto.description,
        value: dto.value,
      },
    });
  }

  findAll() {
    return this.prisma.income.findMany();
  }
}
