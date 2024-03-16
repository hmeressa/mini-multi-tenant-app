import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { CompanyRepository } from "../repositories/company.repository";
import { CreateTable } from "../tables/create.table"; // Assuming you have a service for table creation
import { Company } from "src/models/Company.model";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: CompanyRepository,
    private readonly createTable: CreateTable,
    private readonly connection: Connection
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async findOne(id: any): Promise<Company | undefined> {
    return this.companyRepository.findOne(id);
  }

  async createCompany(company: Company): Promise<Company> {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
      try {
        const result = await this.companyRepository.create({name: company.name, address: company.address });
        await this.companyRepository.save(result);
        await this.createTable.createSchema(company.name);
        await this.createTable.createRoleTable();
        await this.createTable.createPermissionTable();
        await this.createTable.createEmployeeTable();
        await this.createTable.createAttendanceTable();
        await this.createTable.createPayrollTable();
        await this.createTable.createLeaveTable();
        await queryRunner.commitTransaction();
        return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    }
  }

  async update(
    id: number,
    anyData: Partial<Company>
  ): Promise<Company | undefined> {
    await this.companyRepository.update(id, anyData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
