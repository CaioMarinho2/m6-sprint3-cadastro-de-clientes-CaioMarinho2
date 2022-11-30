import { Router } from 'express';
import contactsCreateController from '../controllers/contacts/contactsCreate.controller';
import contactsDeleteController from '../controllers/contacts/contactsDelete.controller';
import contactsListController from '../controllers/contacts/contactsList.controller';
import contactsUpdateController from '../controllers/contacts/contactsUpdate.controller';
import  idOwnerVerifierMiddleware  from '../middlewares/idOwnerVerifier.middleware';
import  schemaValidatedMiddleware  from '../middlewares/schemaValidated.middleware';
import verifyTokenMiddleware from '../middlewares/verifyToken.middleware';
import contactsSchema from '../schemas/contacts/contacts.schema';
import contactsUpdateSchema from '../schemas/contacts/contactsUpdate.schema';

const contactsRoutes = Router();

contactsRoutes.post("/create/:id",verifyTokenMiddleware,idOwnerVerifierMiddleware,schemaValidatedMiddleware(contactsSchema),contactsCreateController)
contactsRoutes.get("/:id",verifyTokenMiddleware,idOwnerVerifierMiddleware,contactsListController)
contactsRoutes.delete("/delete/:contact_id",verifyTokenMiddleware,contactsDeleteController)
contactsRoutes.patch("/update/:contact_id",verifyTokenMiddleware,schemaValidatedMiddleware(contactsUpdateSchema),contactsUpdateController)

export default contactsRoutes;