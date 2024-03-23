// company.repository.ts

import { EntityRepository, Repository } from "typeorm";
import { Company } from '../model'

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
}
