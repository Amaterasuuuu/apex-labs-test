import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { IUser, User } from 'src/user';
import { ITask } from '../interface';
import { TaskType } from '../enum';

@Schema()
export class Task implements ITask {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  _id: string;

  @ApiProperty({ example: 'Buy a groceries' })
  @Prop()
  title: string;

  @ApiPropertyOptional({ example: 'Bread, milk, coffee, tomatoes' })
  @Prop()
  description?: string;

  @ApiProperty({ example: TaskType.IMPORTANT_AND_URGENT })
  @Prop()
  type: TaskType;

  @ApiProperty({ example: false })
  @Prop({ default: false })
  completed: boolean;

  @ApiProperty({ example: new Date() })
  @Prop()
  date?: Date;

  @ApiProperty({ example: new Date() })
  @Prop()
  deadline?: Date;

  @ApiProperty({ example: new Date() })
  @Prop({ default: new Date() })
  created_at: Date;

  @ApiProperty({ example: new Date() })
  @Prop({ default: new Date() })
  updated_at: Date;

  @ApiProperty({ example: User, type: User })
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  creator: IUser;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.pre('save', function () {
  this.updated_at = new Date();
});
