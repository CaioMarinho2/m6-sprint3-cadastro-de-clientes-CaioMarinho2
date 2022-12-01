import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import contactsCreateService from "../../services/contacts/contactsCreate.service";

async function contactsCreateController(req: Request, res: Response) {
  const { name, emails, phones } = req.body;
  const { id } = req.params;

  const newContact = await contactsCreateService({ name, emails, phones, id });
  return res.status(201).json(instanceToPlain(newContact));
}

export default contactsCreateController;
