import {
    Entity,
    Column,
    PrimaryGeneratedColumn,

    ManyToOne
  } from "typeorm";
import { User } from "./users.entity";


@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  telefone_fixo: string;

  @ManyToOne((type) => User, (user) => user.contacts, { onDelete: 'CASCADE' })
  user: User;
}
