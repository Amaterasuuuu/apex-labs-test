import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interface';

@Schema()
export class User implements IUser {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  _id: string;

  @ApiProperty({ example: 'adilet@apex.test' })
  @Prop()
  email: string;

  @ApiHideProperty()
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
