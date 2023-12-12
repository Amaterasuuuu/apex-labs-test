import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { TokenDto, TokenPayloadDto } from 'src/dto';
import { UserServiceToken } from 'src/interface';
import { LoginCommand } from '../commands';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UserServiceToken) private readonly userServiceClient: ClientProxy,
  ) {}

  async execute(command: LoginCommand): Promise<TokenDto> {
    const { email, password } = command;

    const user = await firstValueFrom(
      this.userServiceClient.send('get_user_by_email', { email }),
    );
    const passMatch = await bcrypt.compare(password, user?.password || '');

    if (!user || !passMatch) {
      throw new RpcException('Invalid email or password');
    }

    const payload: TokenPayloadDto = {
      email,
      iat: Date.now(),
      exp: Date.now() + 1000 * 60 * 60,
    };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
