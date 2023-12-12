import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthServiceToken } from '../interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthServiceToken) private readonly authServiceClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization'];
    const user = await firstValueFrom(
      this.authServiceClient.send('validate_token', { token }),
    ).catch(() => false);
    req.user = user;
    return !!user;
  }
}
