import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { CompanyRepository } from "../repositories/company.repository";
import { CreateTable } from "../tables/create.table"; // Assuming you have a service for table creation
import { Company } from "src/models/Company.model";
import { CompanyDto } from "src/dto";
import { UserService } from "./user.service";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: CompanyRepository,
    private readonly createTable: CreateTable,
    private readonly connection: Connection,
    private readonly userService: UserService
  ) {}

  async findAll(): Promise<Company[]> {
     const query = `SELECT current_schema() AS schema_name;`;
    const result = await this.connection.query(query);
    return await this.companyRepository.find();
  }

  async findOne(id: any): Promise<Company | undefined> {
    return await this.companyRepository.findOne({ where: { id: id } });
  }

  async createCompany(companyDto: CompanyDto, userId: string): Promise<Company> {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = this.companyRepository.create({
        name: companyDto.name,
        address: companyDto.address,
        schemaName: companyDto.schemaName,
        companyOwnerId: companyDto.companyOwnerId,
      });
      
      await this.companyRepository.save(result);
      await this.userService.update(userId, companyDto.schemaName);
      await this.createTable.createSchema(companyDto.name);
      await this.createTable.createRoleTable();
      await this.createTable.createPermissionTable();
      await this.createTable.createEmployeeTable();
      await this.createTable.createAttendanceTable();
      await this.createTable.createPayrollTable();
      await this.createTable.createLeaveTable();
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      console.log(err)
      await queryRunner.rollbackTransaction();
      throw err;
    }
  }

  async update(
    id: number,
    anyData: Partial<Company>
  ): Promise<Company | undefined> {
    await this.companyRepository.update(id, anyData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
