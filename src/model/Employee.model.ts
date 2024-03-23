// employee.model.ts

import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity({ name: "employee" })
export class Employee {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: String;

  @Column()
  lastName: String;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  schemaName: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
}
