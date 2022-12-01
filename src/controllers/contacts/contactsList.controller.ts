import { Request, Response } from "express";
import contactsListService from "../../services/contacts/contactsList.service";

async function contactsListController(req: Request, res: Response) {
  const { id } = req.params;
  const contacts = await contactsListService(id);
  return res.status(200).json(contacts);
}

export default contactsListController;
