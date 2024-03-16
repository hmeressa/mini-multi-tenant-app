// leave.model.ts

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: string;

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date" })
  endDate: Date;

  @Column({ type: "text" })
  reason: string;
}
