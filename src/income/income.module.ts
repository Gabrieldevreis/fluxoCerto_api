// src/income/income.module.ts
import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [IncomeService],
  controllers: [IncomeController],
})
export class IncomeModule {}
