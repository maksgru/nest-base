import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AUTH_EXAMPLES } from '../constants';

export default class ConfirmEmailParamDto {
  @ApiProperty({ example: AUTH_EXAMPLES.CONFIRMATION_ID })
  @IsString()
  public readonly id: string;
}
