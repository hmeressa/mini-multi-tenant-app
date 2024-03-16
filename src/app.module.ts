import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyService, PermissionService, RoleService, UserService } from "./services";
import { CompanyRepository, PermissionRepository, RoleRepository, UserRepository } from "./repositories";
import { CompanyController, PermissionController, UserController, RoleController,AuthController } from "./controllers";
import { CreateTable } from "./tables";
import { Company, Permission, Role, User } from "./models";
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
      RoleRepository,
      PermissionRepository,
      CompanyRepository,
      UserRepository,
    ]),
  ],
  controllers: [
    CompanyController,
    UserController,
    RoleController,
    PermissionController,
    AuthController,
  ],
  providers: [
    CompanyService,
    UserService,
    RoleService,
    PermissionService,
    CreateTable,
  ],
})
export class AppModule {}
