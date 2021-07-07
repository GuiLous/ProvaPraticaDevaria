import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ModulosController from '../controllers/ModulosController';

const modulosRouter = Router();
const modulosController = new ModulosController();

// modulosRouter.use(ensureAuthenticated);

modulosRouter.get('/', modulosController.show);
modulosRouter.get('/modulo/:id', modulosController.showOne);
modulosRouter.post('/', ensureAuthenticated, modulosController.create);
modulosRouter.put('/update/:id', ensureAuthenticated, modulosController.update);
modulosRouter.delete(
  '/delete/:id',
  ensureAuthenticated,
  modulosController.delete,
);

export default modulosRouter;
