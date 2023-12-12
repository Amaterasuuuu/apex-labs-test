import { ApiProperty } from '@nestjs/swagger';

export class ExceptionDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Error message' })
  message: string;
}
