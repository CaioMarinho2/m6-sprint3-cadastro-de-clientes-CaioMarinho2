import { Request, Response } from "express";
import contactsCreateService from "../../services/contacts/contactsCreate.service";


async function contactsCreateController(req: Request, res: Response) {
    const {name } = req.body;
  
    contactsCreateService
  }
  
  export default contactsCreateController;