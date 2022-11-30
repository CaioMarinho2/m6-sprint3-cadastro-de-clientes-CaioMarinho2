import { Request, Response } from "express";
import phoneUpdateService from "../../services/phones/phoneUpdate.service";

async function phoneUpdateController(req: Request, res: Response) {

  const phoneId = req.params.id; 
  const { id } = req.user;
  const Newphone  = req.body.phone;

  const updated = await phoneUpdateService({phoneId,id,Newphone});
  return res.status(200).json({ message: "Updated succcessfully" });
}

export default phoneUpdateController;
