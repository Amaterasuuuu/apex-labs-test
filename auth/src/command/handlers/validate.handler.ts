import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { TokenDto, TokenPayloadDto } from 'src/dto';
import { UserServiceToken } from 'src/interface';
import { ValidateCommand } from '../commands';

@CommandHandler(ValidateCommand)
export class ValidateHandler implements ICommandHandler<ValidateCommand> {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UserServiceToken) private readonly userServiceClient: ClientProxy,
  ) {}

  async execute(command: ValidateCommand): Promise<TokenDto> {
    const { token } = command;

    try {
      const { email, exp }: TokenPayloadDto = this.jwtService.decode(
        token?.split(' ').pop(),
      ) as TokenPayloadDto;

      const user = await firstValueFrom(
        this.userServiceClient.send('get_user_by_email', { email }),
      );

      if (Date.now() > exp) {
        throw new RpcException('Unauthorized');
      }

      return user;
    } catch (err) {
      console.log(err);
      throw new RpcException('Unauthorized');
    }
  }
}
