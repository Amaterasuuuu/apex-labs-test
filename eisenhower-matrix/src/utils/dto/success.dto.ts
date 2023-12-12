import { ApiProperty } from '@nestjs/swagger';

export class SuccessDto {
  @ApiProperty({ example: true, default: true })
  success: boolean;

  @ApiProperty({ example: 'Request was completed successfully' })
  message: string;
}
