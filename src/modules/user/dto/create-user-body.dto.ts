import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { USER_EXAMPLES } from '../constants';

export default class CreateUserBodyDto {
  @ApiProperty({ example: USER_EXAMPLES.FIRST_NAME })
  @IsString()
  public readonly firstName: string;

  @ApiProperty({ example: USER_EXAMPLES.PASSWORD })
  @IsString()
  public readonly password: string;

  @ApiProperty({ example: USER_EXAMPLES.EMAIL })
  @IsString()
  @IsEmail()
  public readonly email: string;
}
