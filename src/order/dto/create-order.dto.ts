import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 'Serviço de manutenção' })
  description: string;

  @ApiProperty({ example: 'PAY', enum: ['PAY', 'NO_PAY'] })
  status: 'PAY' | 'NO_PAY';

  @ApiProperty({ example: 300.0 })
  value: string;

  @ApiProperty({ example: 1, description: 'ID do cliente' })
  clientId: number;
}
