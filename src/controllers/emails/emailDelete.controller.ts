import { Request, Response } from "express";
import emailDeleteService from "../../services/emails/emailDelete.service";

async function emailDeleteController(req: Request, res: Response) {
  const email_id = req.params.id;
  const { id } = req.user;

  const deleted = await emailDeleteService(email_id, id);
  return res.status(204).json({ message: "Email deleted successfully" });
}

export default emailDeleteController;
