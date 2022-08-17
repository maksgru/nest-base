import { ISignUp } from '../interfaces';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { USER_EXAMPLES } from '../../user/constants';

export default class SignUpBodyDto implements ISignUp{
  @ApiProperty({ example: USER_EXAMPLES.EMAIL })
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ example: USER_EXAMPLES.FIRST_NAME })
  @IsString()
  public readonly firstName: string;

  @ApiProperty({ example: USER_EXAMPLES.PASSWORD })
  @IsString()
  public readonly password: string;
}
