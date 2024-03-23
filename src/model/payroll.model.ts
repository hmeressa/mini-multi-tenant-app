// payroll.model.ts

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'payroll'})
export class Payroll {
  @PrimaryGeneratedColumn('uuid')
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
