import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'usuario@email.com' })
  email: string;

  @ApiProperty({ example: 'senha123' })
  password: string;
}

