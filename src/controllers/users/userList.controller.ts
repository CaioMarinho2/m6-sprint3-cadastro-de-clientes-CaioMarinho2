import { Request, Response } from "express";
import userListService from "../../services/users/userList.service";
import { instanceToPlain } from "class-transformer";

async function userListController(req: Request, res: Response) {
  const { id } = req.params;

  const userProfile = await userListService(id);
  return res.status(200).json(instanceToPlain(userProfile));
}

export default userListController;
