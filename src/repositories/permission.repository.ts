// role.repository.ts

import { EntityRepository, Repository } from "typeorm";
import { Permission } from "../models";

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {}
