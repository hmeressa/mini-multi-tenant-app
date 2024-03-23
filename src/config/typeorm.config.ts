import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { Attendance, Company, Leave, Payroll, Permission, Role, User, Employee } from "../model";

dotenv.config();

const TypeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "12345678",
  database: "Multitenant",
  entities: [ User, Company, Role, Permission, Employee, Leave, Payroll, Attendance],
  synchronize: false,
};

export { TypeOrmConfig };
