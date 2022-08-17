import { Module } from '@nestjs/common';
import AuthService from './auth.service';
import AuthController from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../../database/entities/user.entity';
import Confirmation from '../../database/entities/confirmation.entity';
import AppJwtModule from '../../common/modules/jwt/app-jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Confirmation]), AppJwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export default class AuthModule {}
