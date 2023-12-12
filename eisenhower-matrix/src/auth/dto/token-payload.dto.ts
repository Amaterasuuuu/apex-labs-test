import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { User } from 'src/user';

export class TokenPayloadDto extends PartialType(
  PickType(User, ['email'] as const),
) {
  @ApiProperty()
  iat?: number;

  @ApiProperty()
  exp?: number;
}
