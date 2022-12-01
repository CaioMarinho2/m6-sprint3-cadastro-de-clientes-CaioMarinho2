import { Request, Response } from "express";
import userLoginService from "../../services/session/userLogin.service";

const userLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const loggedUser = await userLoginService({ email, password });
  return res.status(200).json(loggedUser);
};

export default userLoginController;
