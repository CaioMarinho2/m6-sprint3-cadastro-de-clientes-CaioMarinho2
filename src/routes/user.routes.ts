import { Router } from "express";
import userCreateController from "../controllers/users/userCreate.controller";
import userDeleteController from "../controllers/users/userDelete.controller";
import userListController from "../controllers/users/userList.controller";
import userUpdateController from "../controllers/users/userUpdate.controller";
import idOwnerVerifierMiddleware from "../middlewares/idOwnerVerifier.middleware";
import schemaValidatedMiddleware from "../middlewares/schemaValidated.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import userSchema from "../schemas/users/users.schema";
import userUpdateSchema from "../schemas/users/userUpdate.schema";

const userRoutes = Router();

userRoutes.post(
  "/create",
  schemaValidatedMiddleware(userSchema),
  userCreateController
);

userRoutes.get(
  "/profile/:id",
  verifyTokenMiddleware,
  idOwnerVerifierMiddleware,
  userListController
);
userRoutes.delete(
  "/delete/:id",
  verifyTokenMiddleware,
  idOwnerVerifierMiddleware,
  userDeleteController
);
userRoutes.patch(
  "/update/:id",
  verifyTokenMiddleware,
  idOwnerVerifierMiddleware,
  schemaValidatedMiddleware(userUpdateSchema),
  userUpdateController
);

export default userRoutes;
