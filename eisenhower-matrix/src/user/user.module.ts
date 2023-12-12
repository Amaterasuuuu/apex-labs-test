import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entity';
import { QueryHandlers } from './query';
import { CommandHandlers } from './command';
import { UserController } from './user.controller';
import { UserRmqController } from './user.rmq-controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
  ],
  providers: [...QueryHandlers, ...CommandHandlers],
  exports: [...QueryHandlers],
  controllers: [UserController, UserRmqController],
})
export class UserModule {}
