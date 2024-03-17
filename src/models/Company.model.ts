// company.model.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.model";

@Entity({ name: 'company'})
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  schemaName: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "companyOwnerId" })
  companyOwnerId: User;
}
