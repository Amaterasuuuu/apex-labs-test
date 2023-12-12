import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, IUser } from 'src/user';
import { CreateUserCommand } from '../commands';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements IQueryHandler<CreateUserCommand> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<IUser>,
  ) {}

  async execute(query: CreateUserCommand): Promise<IUser> {
    const { email, password } = query;

    const exist = await this.userModel.findOne({ email });
    if (exist) {
      throw new ConflictException('User is already exists');
    }

    const hasherPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10),
    );

    const newUser = new this.userModel({
      email,
      password: hasherPassword,
    });

    return await newUser.save();
  }
}
