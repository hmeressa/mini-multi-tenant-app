import { Injectable } from "@nestjs/common";
import { ColumnType, Connection, QueryRunner, Table } from "typeorm";
import {
  Attendance,
  Employee,
  Leave,
  Payroll,
  Permission,
  Role,
} from "../models";

@Injectable()
export class CreateTable {
  constructor(private readonly connection: Connection) {}
  async createSchema(schemaName: string): Promise<void> {
    try {
      const query = `CREATE SCHEMA IF NOT EXISTS ${schemaName}`;
      await this.connection.query(query);
      await this.connection.query(`SET search_path TO ${schemaName}`);
    } catch (error) {
      throw error;
    }
  }

  async createTable(entity: any): Promise<void> {
    try {
      const metadata = await this.connection.getMetadata(entity);
      const tableName = metadata.tableName;
      const columns = metadata.columns
        .map(
          (column) =>
            `"${column.databaseName}" ${this.mapColumnType(column.type)}`
        )
        .join(", ");
      const query = `CREATE TABLE ${tableName} (${columns})`;
      await this.connection.query(query);
    } catch (err) {
      throw err;
    }
  }

  async createEmployeeTable(): Promise<void> {
    await this.createTable(Employee);
  }

  async createRoleTable(): Promise<any> {
    return await this.createTable(Role);
  }

  async createPermissionTable(): Promise<void> {
    await this.createTable(Permission);
  }

  async createAttendanceTable(): Promise<void> {
    await this.createTable(Attendance);
  }

  async createPayrollTable(): Promise<void> {
    await this.createTable(Payroll);
  }

  async createLeaveTable(): Promise<void> {
    await this.createTable(Leave);
  }

  private mapColumnType(type: ColumnType): String {
    if (type === Number) {
      return "INTEGER";
    } else if (type === String) {
      return "VARCHAR(255)";
    } else if (type === "uuid") {
      return "uuid";
    } else {
      return "VARCHAR(255)";
    }
  }
}
