// role.controller.ts
import { Controller, Get, Post, Body } from "@nestjs/common";
import { RoleService } from "../services";
import { RoleDto } from "../dto";
import { Role } from "../models";

@Controller("roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Post()
  async create(@Body() roleDto: RoleDto): Promise<Role> {
    return this.roleService.create(roleDto);
  }
}
