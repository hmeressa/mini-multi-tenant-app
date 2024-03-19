// company.dto.ts
import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { User } from "../models";

export class CompanyDto {
  @IsOptional()
  id: string;
    
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  schemaName: string;

  @IsNotEmpty()
  @IsString()
  companyOwnerId: User;
}
