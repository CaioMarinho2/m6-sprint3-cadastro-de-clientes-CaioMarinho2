import { Request, Response } from "express";
import phoneDeleteService from "../../services/phones/phoneDelete.service";


async function phoneDeleteController(req: Request, res: Response) {
   
    const phoneId = req.params.id;
    const {id}=req.user

  const deleted= await phoneDeleteService(phoneId,id)

  return res.status(204).json({ message: 'Phone deleted successfully' });

}

export default phoneDeleteController