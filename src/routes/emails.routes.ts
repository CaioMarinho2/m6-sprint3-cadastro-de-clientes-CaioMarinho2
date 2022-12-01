import { Router } from "express";
import emailCreateController from "../controllers/emails/emailCreate.controller";
import emailDeleteController from "../controllers/emails/emailDelete.controller";
import emailUpdateController from "../controllers/emails/emailUpdate.controller";
import schemaValidatedMiddleware from "../middlewares/schemaValidated.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import emailsSchema from "../schemas/emails/emails.schema";
import emailsUpdateSchema from "../schemas/emails/emailUpdate.schema";

const emailsRoutes = Router();

emailsRoutes.post(
  "/create/:contact_id",
  verifyTokenMiddleware,
  schemaValidatedMiddleware(emailsSchema),
  emailCreateController
);
emailsRoutes.delete(
  "/delete/:id",
  verifyTokenMiddleware,
  emailDeleteController
);
emailsRoutes.patch(
  "/update/:id",
  verifyTokenMiddleware,
  schemaValidatedMiddleware(emailsUpdateSchema),
  emailUpdateController
);

export default emailsRoutes;
