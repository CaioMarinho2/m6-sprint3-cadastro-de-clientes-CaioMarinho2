import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Email } from "./emails.entity";
import { Phone } from "./phones.entity";
import { User } from "./users.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @OneToMany((type) => Phone, (phones) => phones.contacts, { eager: true })
  phones: Phone[];

  @OneToMany((type) => Email, (emails) => emails.contacts, { eager: true })
  emails: Email[];

  @ManyToOne((type) => User, (user) => user.contacts, { onDelete: "CASCADE" })
  @Exclude()
  user: User;
}
