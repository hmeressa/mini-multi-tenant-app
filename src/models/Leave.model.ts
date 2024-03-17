// leave.model.ts

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'leave'})
export class Leave {
  @PrimaryGeneratedColumn('uuid')
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
