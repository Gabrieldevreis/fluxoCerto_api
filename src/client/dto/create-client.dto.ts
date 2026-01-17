import { ApiProperty } from '@nestjs/swagger';
export class CreateClientDto {
  @ApiProperty({ example: 'Cliente X' })
  name: string;

  @ApiProperty({ example: '11999999999', required: false })
  phone?: string;
}