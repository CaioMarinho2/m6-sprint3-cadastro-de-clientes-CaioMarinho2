import { Request, Response } from "express";
import phoneCreateService from "../../services/phones/phoneCreate.service";

async function phoneCreateController(req: Request, res: Response) {

    const phones= await phoneCreateService()
}

export default phoneCreateController