import { ApiProperty } from '@nestjs/swagger';
export class CreateIncomeDto {
  @ApiProperty({ example: 'Venda de produto' })
  description: string;

  @ApiProperty({ example: 1500.0 })
  value: number;
}