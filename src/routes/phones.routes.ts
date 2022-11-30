import { Router } from 'express';
import phoneCreateController from '../controllers/phones/phoneCreate.controller';
import phoneDeleteController from '../controllers/phones/phoneDelete.controller';
import phoneUpdateController from '../controllers/phones/phoneUpdate.controller';

const phonesRoutes = Router();

phonesRoutes.post("",phoneCreateController)
phonesRoutes.delete("",phoneDeleteController)
phonesRoutes.patch("",phoneUpdateController)

export default phonesRoutes