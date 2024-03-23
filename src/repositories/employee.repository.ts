// company.repository.ts

import { EntityRepository, Repository } from "typeorm";
import { Employee } from "../model";

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {}
