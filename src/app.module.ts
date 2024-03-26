import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyService, EmployeeService, PermissionService, RoleService, UserService } from "./services";
import { CompanyRepository, EmployeeRepository, PermissionRepository, RoleRepository, UserRepository } from "./repositories";
import { CompanyController, PermissionController, UserController, RoleController,AuthController, EmployeeController } from "./controllers";
import { CreateTable } from "./tables";
import { Attendance, Company, Employee, Leave, Payroll, Permission, Role, User } from "./model";
import { TypeOrmConfig } from "./config/typeorm.config";
import { ActiveSchema, Authorization, PathChanger } from './middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    TypeOrmModule.forFeature([
      Company,
      User,
      Role,
      Permission,
      Employee,
      Attendance,
      Payroll,
      Leave,

      RoleRepository,
      PermissionRepository,
      CompanyRepository,
      UserRepository,
      EmployeeRepository,
    ]),
  ],
  controllers: [
    CompanyController,
    UserController,
    RoleController,
    PermissionController,
    AuthController,
    EmployeeController,
  ],
  providers: [
    CompanyService,
    UserService,
    RoleService,
    PermissionService,
    CreateTable,
    EmployeeService,
  ],
  exports: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Authorization, PathChanger)
      .exclude("/auth", "/users")
      .forRoutes("*");
  }
}
// export class AppModule{
// }
  
