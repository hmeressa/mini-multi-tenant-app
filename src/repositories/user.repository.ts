// company.repository.ts

import { EntityRepository, Repository } from "typeorm";
import { User } from "../model";

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
