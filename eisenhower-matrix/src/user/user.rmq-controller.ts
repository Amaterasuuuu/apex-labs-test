import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IUser } from './interface';
import { FindUserQuery } from './query';

@Controller('user-rmq')
export class UserRmqController {
  constructor(private readonly queryBus: QueryBus) {}

  @MessagePattern('get_user_by_email')
  async getUserByEmail(@Payload() { email }: FindUserQuery): Promise<IUser> {
    return await this.queryBus.execute(new FindUserQuery(email));
  }
}
