import { Router } from 'express';
import contactsCreateController from '../controllers/contacts/contactsCreate.controller';
import contactsDeleteController from '../controllers/contacts/contactsDelete.controller';
import contactsListController from '../controllers/contacts/contactsList.controller';
import contactsUpdateController from '../controllers/contacts/contactsUpdate.controller';
import  idOwnerVerifierMiddleware  from '../middlewares/idOwnerVerifier.middleware';
import  schemaValidatedMiddleware  from '../middlewares/schemaValidated.middleware';
import verifyTokenMiddleware from '../middlewares/verifyToken.middleware';

const contactsRoutes = Router();

contactsRoutes.post("",verifyTokenMiddleware,idOwnerVerifierMiddleware,contactsCreateController)
contactsRoutes.get("",verifyTokenMiddleware,idOwnerVerifierMiddleware,contactsListController)
contactsRoutes.delete("",verifyTokenMiddleware,idOwnerVerifierMiddleware,contactsDeleteController)
contactsRoutes.patch("",verifyTokenMiddleware,idOwnerVerifierMiddleware,contactsUpdateController)

export default contactsRoutes;