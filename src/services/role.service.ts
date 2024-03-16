// user-role.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleRepository } from "../repositories";
import { RoleDto } from "../dto";
import { Role } from "src/models";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly userRoleRepository: RoleRepository
  ) {}

  async findAll(): Promise<Role[]> {
    return this.userRoleRepository.find();
  }

  async create(roleDto: RoleDto): Promise<Role> {
    const { name, description } = roleDto;
    const role = new Role();
    role.name = name;
    role.description = description;
    return this.userRoleRepository.save(role);
  }
}
