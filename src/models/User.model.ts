import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne, JoinColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { Role } from "./role.model";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  schemaName: string;

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: "roleId" })
  role: Role;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
}
