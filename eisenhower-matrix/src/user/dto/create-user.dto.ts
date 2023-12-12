import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'adilet@apex.test' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'somePassword' })
  @IsString()
  password: string;
}
