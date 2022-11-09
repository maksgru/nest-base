import { AccountStatusEnum } from '../../../database/enums/account-status.enum';
import { IsEmail, IsEnum, IsInt, IsString } from 'class-validator';
import { IUser } from '../../../database/interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { USER_EXAMPLES } from '../constants';

export default class UserDto implements IUser {
  constructor(data?: IUser) {
    Object.assign(this, data);
  }

  @ApiProperty({ example: 1 })
  @IsInt()
  public readonly id: number;

  @ApiProperty({ example: USER_EXAMPLES.EMAIL })
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ example: AccountStatusEnum.REGISTERED })
  @IsEnum(AccountStatusEnum)
  public readonly accountStatus: AccountStatusEnum;

  @ApiProperty({ example: USER_EXAMPLES.FATHER_NAME })
  @IsString()
  public readonly fatherName: string;

  @ApiProperty({ example: USER_EXAMPLES.FIRST_NAME })
  @IsString()
  public readonly firstName: string;

  @ApiProperty({ example: USER_EXAMPLES.LAST_NAME })
  @IsString()
  public readonly lastName: string;

  @ApiProperty({ example: USER_EXAMPLES.LOGIN })
  @IsString()
  public readonly login: string;

  @ApiProperty({ example: USER_EXAMPLES.PHONE })
  @IsString()
  public readonly phone: string;
}
