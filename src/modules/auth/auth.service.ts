import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ISignIn, ISignInPayload } from './interfaces';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../../database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../../database/interfaces/user.interface';
import { SIGN_IN_USER_FIELDS } from './constants';
import * as bcrypt from 'bcrypt';
// import * as path from 'path';
import { MailerService } from '@nestjs-modules/mailer';
// import MAIL_CONSTANTS from '../../common/constants/mail.constants';

@Injectable()
export default class AuthService {
  constructor(
    private readonly mailService: MailerService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) {}

  public async authorize(bearerToken: string): Promise<ISignInPayload> {
    const token = bearerToken.replace('Bearer ', '');
    const payload = this.jwtService.verify(token);
    const user = await this.userRepository.findOne(payload.id);
    const tokenPayload = await this.generateTokenPayload(user);
    return {
      ...tokenPayload,
      user,
    };
  }

  public async signIn(userData: ISignIn): Promise<ISignInPayload> {
    const user = await this.userRepository.findOne(
      { email: userData.email },
      { select: SIGN_IN_USER_FIELDS }
    );
    if (!user) {
      throw new HttpException('wrong email', HttpStatus.BAD_REQUEST);
    }
    await this.comparePasswords(userData.password, user.passwordHash);
    const tokenPayload = await this.generateTokenPayload(user);
    delete user.passwordHash;
    return { ...tokenPayload, user };
  }

  public async refreshToken(refreshToken: string): Promise<ISignInPayload> {
    const payload = this.jwtService.verify(refreshToken);
    const user = await this.userRepository.findOne(payload.id);
    const tokenPayload = await this.generateTokenPayload(user);
    return {
      ...tokenPayload,
      user,
    };
  }

  private async generateTokenPayload(user: IUser) {
    const payload = {
      id: user.id,
    };
    const accessTokenExpiresIn = this.config.get<number>('app.accessTokenExpiresIn');
    const refreshTokenExpiresIn = this.config.get<number>('app.refreshTokenExpiresIn');
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: accessTokenExpiresIn });
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: refreshTokenExpiresIn });

    return {
      accessToken,
      accessTokenExpiresIn,
      refreshToken,
      refreshTokenExpiresIn,
    };
  }

  private generateRegistrationLink = (id: string): string => {
    const host = this.config.get<string>('app.host');
    return `${host}/auth/confirm/${id}`;
  };

  private comparePasswords = async (password: string, passwordHash: string): Promise<void> => {
    const isSame = await bcrypt.compare(password, passwordHash);
    if (!isSame) {
      throw new HttpException('wrong password', HttpStatus.BAD_REQUEST);
    }
  };

  private createPasswordHash = async (password: string) => {
    return await bcrypt.hash(password, 10);
  };
}
