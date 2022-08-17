import USER_ROLES_CONSTANTS from '../constants/user-roles.constants';

export interface IAuthGuard {
  roles: typeof USER_ROLES_CONSTANTS;
}
