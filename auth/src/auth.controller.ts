import { Body, Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto, TokenDto } from './dto';
import { LoginCommand, ValidateCommand } from './command';

@Controller('AUTH')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern('create_token')
  async login(@Payload() { email, password }: LoginDto): Promise<TokenDto> {
    return await this.commandBus.execute(new LoginCommand(email, password));
  }

  @MessagePattern('validate_token')
  async validate(@Body() { token }: TokenDto): Promise<TokenDto> {
    return await this.commandBus.execute(new ValidateCommand(token));
  }
}
