// company.repository.ts

import { EntityRepository, Repository } from "typeorm";
import { Company } from '../models'

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
}
