import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Contact } from "./contacts.entity";
import { User } from "./users.entity";

@Entity("phones")
export class Phone {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  phone: string;

  @ManyToOne((type) => User, (user) => user.phones, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne((type) => Contact, (contact) => contact.phones, {
    onDelete: "CASCADE",
  })
  contacts: Contact;
}
