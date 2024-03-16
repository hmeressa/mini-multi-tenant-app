// CompanyService.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { CompanyService } from '../services';
import { Company } from "../models";

@Controller("companies")
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService  ) {}
  @Get()
  async findAll(): Promise<any> {
    return this.companyService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<any> {
    return this.companyService.findOne(+id);
  }

  @Post()
  async createCompany(@Body() company: Company): Promise<Company> {
      return await this.companyService.createCompany(company);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() CompanyServiceData: Partial<any>
  ): Promise<any> {
    return this.companyService.update(+id, CompanyServiceData);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    return this.companyService.remove(+id);
  }
}
