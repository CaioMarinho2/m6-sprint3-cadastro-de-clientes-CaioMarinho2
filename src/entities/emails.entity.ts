import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne
  } from "typeorm";
import { Contact } from "./contacts.entity";



@Entity("emails")
export class Email {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  email: string;


  @ManyToOne((type) => Contact, (contact) => contact.emails, { onDelete: 'CASCADE' })
  contacts: Contact;
}
