import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name:'role'})
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;
}
