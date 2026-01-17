import { ApiProperty } from '@nestjs/swagger';
export class CreateExpenseDto {
  @ApiProperty({ example: 'Compra de material' })
  description: string;

  @ApiProperty({ example: 500.0 })
  value: number;
}
