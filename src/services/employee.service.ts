import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeDto } from "../dto";
import { Employee } from "../models";
import { EmployeeRepository } from "../repositories";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: EmployeeRepository
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

  async create(id: any, employeeDto: EmployeeDto): Promise<Employee> {
    const newEmployee = this.employeeRepository.create(employeeDto);
    return await this.employeeRepository.save(newEmployee);
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
