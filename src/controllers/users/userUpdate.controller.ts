import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import userUpdateService from "../../services/users/userUpdate.service";

async function userUpdateController(req: Request, res: Response) {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!name && !email && !password) {
    throw new AppError("there is no valid data to be changed", 400);
  }

  const update = await userUpdateService(id, { name, email, password });

  return res.status(200).json({ message: "Updated succcessfully" });
}

export default userUpdateController;
