import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import AuthService from './auth.service';
import SignUpBodyDto from './dto/sign-up-body.dto';
import SignInBodyDto from './dto/sign-in-body.dto';
import SignInResponseBodyDto from './dto/sign-in-response-body.dto';
import ConfirmEmailParamDto from './dto/confirm-email-param.dto';
import RefreshTokenBodyDto from './dto/refresh-token-body.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import SignUpResponseBodyDto from './dto/sign-up-response-body.dto';

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

  @Post('sign-up')
  @ApiResponse({ type: SignUpResponseBodyDto })
  public async signUp(@Body() body: SignUpBodyDto): Promise<SignUpResponseBodyDto> {
    const confirmationLink = await this.authService.signUp(body);
    return new SignUpResponseBodyDto({ confirmationLink });
  }

  @Get('confirm/:id')
  @ApiResponse({ type: SignInResponseBodyDto })
  public async confirmEmail(@Param() param: ConfirmEmailParamDto): Promise<SignInResponseBodyDto> {
    const userData = await this.authService.confirmEmail(param.id);
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
