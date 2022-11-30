import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany
} from "typeorm";
import { Exclude } from "class-transformer";
import { Contact } from "./contacts.entity";
import { Phone } from "./phones.entity";


@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany((type) => Phone, (phones) => phones.user,{eager: true})
  phones: Phone[];

  @OneToMany((type) => Contact, (contacts) => contacts.user,{eager: true})
  contacts: Contact[];
}
