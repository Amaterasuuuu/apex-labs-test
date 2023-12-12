import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule, AuthServiceToken } from 'src/auth';
import { QueryHandlers } from './query';
import { CommandHandlers } from './command';
import { Task, TaskSchema } from './entity';
import { TaskController } from './task.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    ClientsModule.register([
      {
        name: AuthServiceToken,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    AuthModule,
    CqrsModule,
  ],
  controllers: [TaskController],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class TaskModule {}
