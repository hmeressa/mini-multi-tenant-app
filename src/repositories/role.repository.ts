// role.repository.ts

import { EntityRepository, Repository } from "typeorm";
import { Role } from "../models";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {}
