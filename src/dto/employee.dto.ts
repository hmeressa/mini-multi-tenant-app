// employee.dto.ts
import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional } from "class-validator";

export class EmployeeDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  schemaName: string;
}
