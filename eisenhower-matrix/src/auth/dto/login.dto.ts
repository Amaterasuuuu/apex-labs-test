import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'adilet@apex.test' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'somePassword' })
  @IsString()
  password: string;
}
