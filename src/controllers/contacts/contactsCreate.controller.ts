import { Request, Response } from "express";
import contactsCreateService from "../../services/contacts/contactsCreate.service";


async function contactsCreateController(req: Request, res: Response) {
    const { } = req.body;
  
    contactsCreateService
  }
  
  export default contactsCreateController;