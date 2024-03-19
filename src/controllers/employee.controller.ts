import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from "@nestjs/common";
import { CompanyService, EmployeeService } from "../services";
import { EmployeeDto } from "../dto";
import { Employee } from "../models";

@Controller("employees")
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService,
        private readonly companyService: CompanyService) { }

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @Post(":id")
  async create(@Param("id") id: any, @Body() employeeDto: EmployeeDto): Promise<Employee> {
    const company = await this.companyService.findOne(id);
      if (!company) {
          throw new NotFoundException("Company Not Found");
      }
      return await this.employeeService.create(employeeDto, company.schemaName);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() employeeDto: EmployeeDto
  ): Promise<Employee> {
    return this.employeeService.update(id, employeeDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    return this.employeeService.remove(id);
  }
}
