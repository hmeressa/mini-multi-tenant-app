import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";

export class UserDto {
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
  @IsString()
  password: string;

  @IsOptional()
  schemaName?: string; // Making schemaName optional
}
