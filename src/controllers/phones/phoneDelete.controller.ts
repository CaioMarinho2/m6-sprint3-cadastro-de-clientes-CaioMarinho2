import { Request, Response } from "express";
import phoneDeleteService from "../../services/phones/phoneDelete.service";


async function phoneDeleteController(req: Request, res: Response) {

  const deleted= await phoneDeleteService()

}

export default phoneDeleteController