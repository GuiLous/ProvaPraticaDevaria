import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AulasController from '../controllers/AulasController';

const aulasRouter = Router();
const aulasController = new AulasController();

// aulasRouter.use(ensureAuthenticated);

aulasRouter.get('/', aulasController.show);
aulasRouter.get('/aula/:id', aulasController.showOne);
aulasRouter.get('/aulasModulo/:modulo', aulasController.showByModulo);
aulasRouter.post('/', ensureAuthenticated, aulasController.create);
aulasRouter.put('/update/:id', ensureAuthenticated, aulasController.update);
aulasRouter.delete('/delete/:id', ensureAuthenticated, aulasController.delete);

export default aulasRouter;
