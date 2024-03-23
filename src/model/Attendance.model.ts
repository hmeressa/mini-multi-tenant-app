// attendance.model.ts

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'attendance'})
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
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
