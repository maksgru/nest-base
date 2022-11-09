import { AccountStatusEnum } from '../enums/account-status.enum';

export interface IUser {
  readonly id: number;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly login: string;
  readonly phone: string;
  readonly accountStatus: AccountStatusEnum;
  readonly fatherName: string;
}
