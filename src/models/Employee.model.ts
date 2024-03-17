// employee.model.ts

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'employee'})
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: String;

  @Column()
  lastName: String;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
