import { Injectable } from "@nestjs/common";
import { Connection, QueryRunner, Table } from "typeorm";
import { Attendance, Employee, Leave, Payroll, Permission, Role } from "../models";

@Injectable()
export class CreateTable {
  private queryRunner: QueryRunner;

  constructor(private readonly connection: Connection) {
    this.queryRunner = this.connection.createQueryRunner();
  }
  async createSchema(schemaName: string): Promise<any> {
    await this.queryRunner.connect();
    try {
      await this.queryRunner.createSchema(schemaName, true);
      await this.queryRunner.query(`SET search_path TO ${schemaName}`);
    } catch (error) {
      throw error;
    }
  }

  async createEmployeeTable(): Promise<any> {
    await this.queryRunner.connect();
    try {
      await this.queryRunner.createTable(new Table(Employee), true);
    } catch (err) {
      throw err;
    }
  }

  async createRoleTable(): Promise<any> {
    await this.queryRunner.connect();
    try {
      await this.queryRunner.createTable(new Table(Role), true);
    } catch (err) {
      throw err;
    }
  }

  async createPermissionTable(): Promise<any> {
    await this.queryRunner.connect();
    try {
      await this.queryRunner.createTable(new Table(Permission), true);
    } catch (err) {
      throw err;
    }
  }

  async createAttendanceTable(): Promise<any> {
    await this.queryRunner.connect();
    try {
      await this.queryRunner.createTable(new Table(Attendance), true);
    } catch (err) {
      throw err;
    }
  }

  async createPayrollTable(): Promise<any> {
    await this.queryRunner.connect();
    try {
      await this.queryRunner.createTable(new Table(Payroll), true);
    } catch (err) {
      throw err;
    }
  }

  async createLeaveTable(): Promise<any> {
    await this.queryRunner.connect();
    try {
      await this.queryRunner.createTable(new Table(Leave), true);
    } catch (err) {
      throw err;
    }
  }
}
