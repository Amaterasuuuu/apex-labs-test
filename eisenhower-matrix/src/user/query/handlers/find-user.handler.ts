import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entity';
import { IUser } from 'src/user/interface';
import { FindUserQuery } from '../queries';

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<IUser>,
  ) {}

  async execute(query: FindUserQuery): Promise<IUser> {
    const { email } = query;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User is not defined');
    }

    return user;
  }
}
