import { AccountStatusEnum } from '../enums/account-status.enum';
import { IProduct } from './product.interface';
import { IShop } from './shop.interface';

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
