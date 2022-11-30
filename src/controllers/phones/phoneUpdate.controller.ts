import { Request, Response } from "express";
import phoneUpdateService from "../../services/phones/phoneUpdate.service";

async function phoneUpdateController(req: Request, res: Response) {

const updated= await phoneUpdateService()
 
}

export default phoneUpdateController