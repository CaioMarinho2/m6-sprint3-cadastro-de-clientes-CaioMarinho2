import { Request, Response } from "express";
import contactsUpdateService from "../../services/contacts/contactsUpdate.service";


async function contactsUpdateController(req: Request, res: Response) {
  const { contact_id } = req.params;
  const {id}=req.user
  const {name} = req.body;
  
   const updatedUser=await contactsUpdateService({id, contact_id,name})

   return res.status(200).json({ message: "Updated succcessfully" });
  }
  
  export default contactsUpdateController;