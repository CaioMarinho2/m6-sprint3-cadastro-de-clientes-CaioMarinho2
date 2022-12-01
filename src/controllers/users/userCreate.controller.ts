import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import userCreateService from "../../services/users/userCreate.service";

async function userCreateController(req: Request, res: Response) {
  const { name, email, password, phones } = req.body;

  const newUser = await userCreateService({ name, email, password, phones });
  return res.status(201).json(instanceToPlain(newUser));
}

export default userCreateController;
