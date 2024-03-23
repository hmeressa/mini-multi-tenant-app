// role.repository.ts

import { EntityRepository, Repository } from "typeorm";
import { Permission } from "../model";

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {}
