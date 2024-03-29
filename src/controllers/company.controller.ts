import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  NotFoundException,
} from "@nestjs/common";
import { CompanyService } from "../services";
import { Company } from "../model";
import { CompanyDto } from "../dto";
import { Request } from "express";


@Controller("companies")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async findAll(): Promise<Company[]> {
    return await this.companyService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Company> {
    const data = await this.companyService.findOne(id);
    console.log(data)
    return data
  }
@Post()
  async createCompany(@Body() companyDto: CompanyDto, @Req() req: Request): Promise<Company> {
  if (req['user'].id != companyDto.companyOwnerId) {
    throw new NotFoundException({
      message: "Not Found",
      error: "Please provide correct company id"
    });
  }
  return await this.companyService.createCompany(req["user"].id, companyDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() companyData: CompanyDto
  ): Promise<Company> {
    return this.companyService.update(id, companyData);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    return this.companyService.remove(id);
  }
}
