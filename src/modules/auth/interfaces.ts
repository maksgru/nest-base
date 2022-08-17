import { IUser } from '../../database/interfaces/user.interface';

export interface ISignUp {
  readonly email: string;
  readonly password: string;
  readonly firstName: string,
}

export interface ISignIn {
  readonly email: string;
  readonly password: string;
}

export interface ITokenPayload {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}

export interface ISignInPayload extends ITokenPayload {
  readonly user: IUser;
}
