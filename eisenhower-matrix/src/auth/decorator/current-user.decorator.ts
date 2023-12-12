import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayloadDto } from '../dto';

export const CurrentUser = createParamDecorator(
  (_data: any, context: ExecutionContext): TokenPayloadDto => {
    const req = context.switchToHttp().getRequest();

    return req.user;
  },
);
