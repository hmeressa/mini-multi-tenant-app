import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyService, EmployeeService, PermissionService, RoleService, UserService } from "./services";
import { CompanyRepository, EmployeeRepository, PermissionRepository, RoleRepository, UserRepository } from "./repositories";
import { CompanyController, PermissionController, UserController, RoleController,AuthController, EmployeeController } from "./controllers";
import { CreateTable } from "./tables";
import { Company, Employee, Permission, Role, User } from "./models";
import { Authorization } from "./middleware";
@Module({
  imports: [
    TypeOrmModule.forRoot({
                  type: "postgres",
                  host: "localhost",
                  port: 5432,
                  username: "postgres",
                  password: "12345678",
                  database: "Multitenant",
                  entities: [User, Company, Role, Permission],
                  synchronize: true,
    }),
    TypeOrmModule.forFeature([
                  Company,
                  User,
                  Role,
                  Permission,
                  Employee,
                  RoleRepository,
                  PermissionRepository,
                  CompanyRepository,
                  UserRepository,
                  EmployeeRepository
    ]),
  ],
  controllers: [
                  CompanyController,
                  UserController,
                  RoleController,
                  PermissionController,
                  AuthController,
                  EmployeeController
  ],
  providers: [
                  CompanyService,
                  UserService,
                  RoleService,
                  PermissionService,
                  CreateTable,
                  EmployeeService
  ],
})
  
export class AppModule {
  }
