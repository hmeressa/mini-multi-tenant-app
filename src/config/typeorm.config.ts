import { Employee } from './../models/Employee.model';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { Attendance, Company, Leave, Payroll, Permission, Role, User } from "../models";

dotenv.config();

const TypeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "12345678",
  database: "Multitenant",
  entities: [User, Company, Role, Permission, Employee, Attendance, Payroll, Leave ],
  synchronize: false,
};

export { TypeOrmConfig };
