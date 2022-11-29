import { Request, Response } from "express";
import userUpdateService from "../../services/users/userUpdate.service";


async function userUpdateController(req: Request, res: Response) {
    const data = req.body;
  
    userUpdateService
  }
  
  export default userUpdateController;