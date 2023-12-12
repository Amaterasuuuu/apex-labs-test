import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { TaskType } from '../enum';

export class CreateTaskDto {
  @ApiProperty({ example: 'Buy a groceries' })
  @IsString()
  @Length(0, 50)
  title: string;

  @ApiProperty({ example: 'Bread, milk, coffee, tomatoes' })
  @Length(0, 150)
  description: string;

  @ApiProperty({ example: TaskType.IMPORTANT_AND_NOT_URGENT })
  @IsEnum(TaskType)
  type: TaskType;

  @ApiPropertyOptional({ example: '2023-12-12' })
  @IsString()
  date: Date;

  @ApiPropertyOptional({ example: '2023-12-13' })
  @IsString()
  @IsOptional()
  deadline?: Date;
}
