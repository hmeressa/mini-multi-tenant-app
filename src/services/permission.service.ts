// permission.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "../model";
import { PermissionDto } from "../dto";
import { PermissionRepository } from "../repositories";

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: PermissionRepository
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async create(permissionDto: PermissionDto): Promise<Permission> {
    const { name, description } = permissionDto;
    const permission = new Permission();
    permission.name = name;
    permission.description = description;
    return this.permissionRepository.save(permission);
  }
}
