import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany
} from "typeorm";
import { Exclude } from "class-transformer";
import { Contact } from "./contacts.entity";


@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefone_fixo: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany((type) => Contact, (contacts) => contacts.user)
  contacts: Contact[];
}
