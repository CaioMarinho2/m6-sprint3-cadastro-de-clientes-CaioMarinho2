import { Request, Response } from "express";
import userDeleteService from "../../services/users/userDelete.service";


async function userDeleteController(req: Request, res: Response) {
  const { id } = req.params;
  
  const deleted = await userDeleteService(id);
  
  return res.status(204).json({ message: 'User deleted successfully' });
  }
  
  export default userDeleteController;