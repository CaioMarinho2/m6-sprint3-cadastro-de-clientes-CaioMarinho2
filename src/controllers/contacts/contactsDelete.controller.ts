import { Request, Response } from "express";
import contactsDeleteService from "../../services/contacts/contactsDelete.service";

async function contactsDeleteController(req: Request, res: Response) {
  const { contact_id } = req.params;
  const { id } = req.user;
  const contactDeleted = await contactsDeleteService(id, contact_id);

  return res.status(204).json({ message: "Contact deleted successfully" });
}

export default contactsDeleteController;
