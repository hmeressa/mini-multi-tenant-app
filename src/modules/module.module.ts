import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company, User } from "../models";
import { CompanyRepository, UserRepository } from "../repositories";
import { CompanyController, UserController } from "../controllers";
import { CompanyService, UserService } from "../services";
import { CreateTable } from "src/tables";
@Module({
  imports: [TypeOrmModule.forFeature([
      Company,
      User,
      CompanyRepository,
      UserRepository,
    ]),
  ],
  controllers: [ CompanyController, UserController],
  providers: [ CompanyService, UserService, CreateTable ],
})
export class module {}
