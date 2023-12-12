import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserCommand } from './command';
import { CreateUserDto } from './dto';
import { IUser } from './interface';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() { email, password }: CreateUserDto): Promise<IUser> {
    return await this.commandBus.execute(
      new CreateUserCommand(email, password),
    );
  }
}
