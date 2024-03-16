import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEYS = 'permissions';

export const Permissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEYS, permissions);
