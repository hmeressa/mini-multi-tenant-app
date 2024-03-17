import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { CompanyService } from "../services";
import { Company } from "../models";
import { CompanyDto } from "../dto";

@Controller("companies")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Company> {
    return this.companyService.findOne(id);
  }

  @Post()
  async createCompany(@Body() companyDto: CompanyDto): Promise<Company> {
    return this.companyService.createCompany(companyDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() companyData: CompanyDto
  ): Promise<Company> {
    return this.companyService.update(+id, companyData);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    return this.companyService.remove(+id);
  }
}
