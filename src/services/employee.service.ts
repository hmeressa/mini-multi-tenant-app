import { UserService } from './user.service';
import { Connection } from 'typeorm';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeDto } from "../dto";
import { Employee } from "../model";
import { EmployeeRepository } from "../repositories";
@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: EmployeeRepository,
    private readonly connection: Connection,
    private readonly userService: UserService
  ) {}

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findOne(id: any): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id);
    if (!employee) {
      throw new NotFoundException("Employee not found");
    }
    return employee;
  }

  async create(employeeDto: EmployeeDto): Promise<Employee> {
    const employee = await this.employeeRepository.create(employeeDto);
    // await this.userService.create(employee);
    return await this.employeeRepository.save(employee);
  }

  async update(id: any, employeeDto: EmployeeDto): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id);
    if (!employee) {
      throw new NotFoundException("Employee not found");
    }
    this.employeeRepository.merge(employee, employeeDto);
    return await this.employeeRepository.save(employee);
  }

  async remove(id: any): Promise<void> {
    const employee = await this.employeeRepository.findOne(id);
    if (!employee) {
      throw new NotFoundException("Employee not found");
    }
    await this.employeeRepository.remove(employee);
  }
}
