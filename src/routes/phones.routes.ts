import { Router } from "express";
import phoneCreateController from "../controllers/phones/phoneCreate.controller";
import phoneDeleteController from "../controllers/phones/phoneDelete.controller";
import phoneUpdateController from "../controllers/phones/phoneUpdate.controller";
import schemaValidatedMiddleware from "../middlewares/schemaValidated.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import phonesSchema from "../schemas/phones/phone.schema";
import phoneUpdateSchema from "../schemas/phones/phoneUpdate.schema";

const phonesRoutes = Router();

phonesRoutes.post(
  "/create/:owner_id",
  verifyTokenMiddleware,
  schemaValidatedMiddleware(phonesSchema),
  phoneCreateController
);
phonesRoutes.delete(
  "/delete/:id",
  verifyTokenMiddleware,
  phoneDeleteController
);
phonesRoutes.patch(
  "/update/:id",
  verifyTokenMiddleware,
  schemaValidatedMiddleware(phoneUpdateSchema),
  phoneUpdateController
);

export default phonesRoutes;
