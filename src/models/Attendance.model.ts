// attendance.model.ts

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: string;
    
  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time", nullable: true })
  startTime: Date;

  @Column({ type: "time", nullable: true })
  endTime: Date;
}
