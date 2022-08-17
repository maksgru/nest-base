import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class SignUpResponseBodyDto {
  constructor(data: unknown) {
    Object.assign(this, data);
  }

  @ApiProperty({ example: 'https://api-host.com/auth/confirm/a371c438-e6f2-4d2a-8f29-e44b654172f0' })
  @IsString()
  public confirmationLink: string;
}
