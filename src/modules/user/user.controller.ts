import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import UserService from './user.service';
import UserDto from './dto/user.dto';
import GetUserParamDto from './dto/get-user-param.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../common/guargs/auth-guard';
import CreateUserBodyDto from './dto/create-user-body.dto';

@Controller('users')
@ApiTags('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Post('/')
  @ApiResponse({ type: UserDto })
  public create(
    @Body() body: CreateUserBodyDto
  ): Promise<UserDto> {
    return this.userService.create(body);
  }

  @Auth()
  @Get(':id')
  @ApiResponse({ type: UserDto })
  public async getUser(
    @Param() param: GetUserParamDto
  ): Promise<UserDto> {
    return this.userService.getUser(param.id);
  }

  @Auth()
  @Get('/')
  @ApiResponse({ type: [UserDto] })
  public async getUsers(): Promise<UserDto[]> {
    const users = await this.userService.getUsers();
    return users.map(user => new UserDto(user));
  }
}
