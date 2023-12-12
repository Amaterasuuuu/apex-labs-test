import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ExceptionDto } from 'src/utils';
import { LoginDto, TokenDto } from './dto';
import { AuthServiceToken } from './interface';

@ApiTags('Authorization')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    @Inject(AuthServiceToken) private readonly authServiceClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: "User's auth by email and password" })
  @ApiOkResponse({ type: TokenDto })
  @ApiBadRequestResponse({
    type: ExceptionDto,
    description: 'Invalid email or password',
  })
  async login(@Body() { email, password }: LoginDto): Promise<TokenDto> {
    return await firstValueFrom(
      this.authServiceClient.send('create_token', { email, password }),
    ).catch((err) => new BadRequestException(err.message));
  }
}
