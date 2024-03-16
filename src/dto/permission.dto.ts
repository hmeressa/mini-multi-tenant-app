// permission.dto.ts
import { IsNotEmpty, IsString } from "class-validator";

export class PermissionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
