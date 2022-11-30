import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

const idOwnerVerifierMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const idComparer = req.user.id;

  if (id !== idComparer) {
    throw new AppError("Unauthorized", 401);
  } else {
    next();
  }
};

export default  idOwnerVerifierMiddleware ;
