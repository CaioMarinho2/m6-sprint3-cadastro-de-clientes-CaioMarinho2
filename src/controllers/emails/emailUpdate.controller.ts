import { Request, Response } from "express";
import emailUpdateService from "../../services/emails/emailUpdate.service";


async function emailUpdateController(req: Request, res: Response) {

    const email_id  = req.params.id;
    const {id}=req.user
    const {email}=req.body

    const updated= await emailUpdateService({email,email_id,id})
    return res.status(200).json({ message: "Updated succcessfully" });
}

export default emailUpdateController