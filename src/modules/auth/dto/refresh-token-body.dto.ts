import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AUTH_EXAMPLES } from '../constants';

export default class RefreshTokenBodyDto {
  @ApiProperty({ example: AUTH_EXAMPLES.TOKEN })
  @IsString()
  public readonly refreshToken: string;
}
