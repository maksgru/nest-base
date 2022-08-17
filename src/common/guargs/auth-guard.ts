import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IAuthGuard } from '../interfaces/auth-guard.interfaces';

import { UseGuards } from '@nestjs/common';

export function Auth(params?: IAuthGuard): MethodDecorator {
  return UseGuards(new AuthGuard(params));
}


@Injectable()
class AuthGuard implements CanActivate {
  constructor(private roles: IAuthGuard) {}

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles = this.roles;
    return this.checkPermissions(request);
  }

  private checkPermissions = (request: unknown): boolean => {
    // TODO Add authorization
    return true;
  };
}
