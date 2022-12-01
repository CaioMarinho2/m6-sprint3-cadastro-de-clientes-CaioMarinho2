import { Express } from "express";
import contactsRoutes from "./contacts.routes";
import emailsRoutes from "./emails.routes";
import phonesRoutes from "./phones.routes";
import sessionRoutes from "./session.routes";
import userRoutes from "./user.routes";

export const appRoutes = (app: Express) => {
  app.use("/users", userRoutes);
  app.use("/contacts", contactsRoutes);
  app.use("/login", sessionRoutes);
  app.use("/emails", emailsRoutes);
  app.use("/phones", phonesRoutes);
};
