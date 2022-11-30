import { Router } from "express";
import  userLoginController  from "../controllers/session/userLogin.controller";
import  schemaValidatedMiddleware  from "../middlewares/schemaValidated.middleware";
import  sessionLoginSchema  from "../schemas/session/sessionLoginSchema";

const sessionRoutes = Router();

sessionRoutes.post(
    "/users",
    schemaValidatedMiddleware(sessionLoginSchema),
    userLoginController
  );

export default sessionRoutes;