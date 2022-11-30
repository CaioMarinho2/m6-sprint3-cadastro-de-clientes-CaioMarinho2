import { Request, Response } from "express";
import phoneCreateService from "../../services/phones/phoneCreate.service";

async function phoneCreateController(req: Request, res: Response) {
    const { owner_id } = req.params;
    const {id}=req.user
    const {phones} = req.body;

    const phonesCreated= await phoneCreateService({id,phones,owner_id})
    
    return res.status(201).json(phonesCreated);
}

export default phoneCreateController