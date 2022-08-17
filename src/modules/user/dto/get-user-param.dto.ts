import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export default class GetUserParamDto {
  @ApiProperty({ example: 23 })
  @IsInt()
  @Type(() => Number)
  public readonly id: number;
}
