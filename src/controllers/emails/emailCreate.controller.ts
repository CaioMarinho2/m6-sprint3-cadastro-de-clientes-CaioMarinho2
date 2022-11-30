import { Request, Response } from "express";
import emailCreateService from "../../services/emails/emailCreate.service";

async function emailCreateController(req: Request, res: Response) {
   
    const { contact_id } = req.params;
    const {id}=req.user
    const {emails} = req.body;

   const emailCreated= await  emailCreateService({id,contact_id,emails})

   return res.status(201).json(emailCreated);
}

export default emailCreateController