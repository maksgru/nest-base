import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import AuthService from './auth.service';
import SignInBodyDto from './dto/sign-in-body.dto';
import SignInResponseBodyDto from './dto/sign-in-response-body.dto';
import RefreshTokenBodyDto from './dto/refresh-token-body.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Get()
  @ApiResponse({ type: SignInResponseBodyDto })
  public async authorize(@Headers('Authorization') bearerToken: string): Promise<SignInResponseBodyDto> {
    const userData = await this.authService.authorize(bearerToken);
    return new SignInResponseBodyDto(userData);
  }

  @Post('sign-in')
  @ApiResponse({ type: SignInResponseBodyDto })
  public async signIn(@Body() body: SignInBodyDto): Promise<SignInResponseBodyDto> {
    const userData = await this.authService.signIn(body);
    return new SignInResponseBodyDto(userData);
  }

  @Post('refresh')
  @ApiResponse({ type: SignInResponseBodyDto })
  public tokenRefresh(@Body() body: RefreshTokenBodyDto): Promise<SignInResponseBodyDto> {
    return this.authService.refreshToken(body.refreshToken);
  }
}
