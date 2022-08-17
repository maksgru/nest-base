import { ISignInPayload } from '../interfaces';
import UserDto from '../../user/dto/user.dto';
import { IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AUTH_EXAMPLES } from '../constants';

export default class SignInResponseBodyDto implements ISignInPayload {
  constructor(data: ISignInPayload) {
    this.user = new UserDto(data.user);
    Object.assign(this, data);
  }

  @ApiProperty({ example: AUTH_EXAMPLES.TOKEN })
  @IsString()
  public readonly accessToken: string;

  @ApiProperty({ example: 1000 })
  @IsString()
  public readonly accessTokenExpiresIn: number;

  @ApiProperty({ example: AUTH_EXAMPLES.TOKEN })
  @IsString()
  public readonly refreshToken: string;

  @ApiProperty({ example: 2000 })
  @IsInt()
  public readonly refreshTokenExpiresIn: number;

  @ApiProperty({ example: UserDto })
  @ValidateNested()
  @Type(() => UserDto)
  public readonly user: UserDto;
}
