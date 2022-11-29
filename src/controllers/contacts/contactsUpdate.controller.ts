import { Request, Response } from "express";
import contactsUpdateService from "../../services/contacts/contactsUpdate.service";


async function contactsUpdateController(req: Request, res: Response) {
    const data = req.body;
  
    contactsUpdateService
  }
  
  export default contactsUpdateController;