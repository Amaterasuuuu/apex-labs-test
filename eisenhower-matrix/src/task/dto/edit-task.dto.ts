import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { TaskType } from '../enum';

export class EditTaskDto {
  @ApiPropertyOptional({ example: 'Buy a groceries' })
  @IsString()
  @Length(0, 50)
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Bread, milk, coffee, tomatoes' })
  @Length(0, 150)
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ example: TaskType.IMPORTANT_AND_NOT_URGENT })
  @IsEnum(TaskType)
  @IsOptional()
  type: TaskType;

  @ApiPropertyOptional({ example: '2023-12-13' })
  @IsString()
  @IsOptional()
  date: Date;

  @ApiPropertyOptional({ example: '2023-12-14' })
  @IsString()
  @IsOptional()
  deadline?: Date;
}
