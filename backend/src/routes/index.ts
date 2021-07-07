import { Router } from 'express';

import aulasRouter from './aulas.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import modulosRouter from './modulos.routes';

const routes = Router();

routes.use('/aulas', aulasRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/modulos', modulosRouter);

export default routes;
