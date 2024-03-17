// company.repository.ts

import { EntityRepository, Repository } from "typeorm";
import { Employee } from "../models";

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {}
