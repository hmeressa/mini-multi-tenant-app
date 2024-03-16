import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolePermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    if (request?.body?.role?.permission) {
      const userPermissions = request.body.role.permission.map(
        (permission: any) => permission.slug,
      );

      const hasRequiredPermission = requiredPermissions.every(
        (requiredPermission) => userPermissions.includes(requiredPermission),
      );

      if (hasRequiredPermission) {
        return true;
      }
    }
    return false;
  }
}
