// permission.controller.ts
import { Controller, Get, Post, Body } from "@nestjs/common";
import { PermissionService } from "../services";
import { PermissionDto } from "../dto";
import { Permission } from "../model";

@Controller("permissions")
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Post()
  async create(@Body() permissionDto: PermissionDto): Promise<Permission> {
    return this.permissionService.create(permissionDto);
  }
}
