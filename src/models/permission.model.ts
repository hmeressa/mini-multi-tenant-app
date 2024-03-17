// permission.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'permission'})
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
