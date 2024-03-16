// company.model.ts

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;
}
