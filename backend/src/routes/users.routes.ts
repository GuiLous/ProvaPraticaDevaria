import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', ensureAuthenticated, usersController.show);
usersRouter.get('/user/:id', ensureAuthenticated, usersController.showOne);
usersRouter.post('/', usersController.create);
usersRouter.put('/update/:id', ensureAuthenticated, usersController.update);
usersRouter.delete('/delete/:id', ensureAuthenticated, usersController.delete);
export default usersRouter;
