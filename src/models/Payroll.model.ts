// payroll.model.ts

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payroll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: string;

  @Column()
  position: string;

  @Column({ type: "date" })
  hireDate: Date;

  @Column()
  isActive: boolean;
}
