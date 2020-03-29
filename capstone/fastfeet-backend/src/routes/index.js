import { Router } from 'express';

import { autenticated } from '@middlewares';

import recipients from './routes-recipients';
import users from './routes-users';
import token from './routes-token';

const routes = new Router();

routes.use('/token', token);
routes.use(autenticated);
routes.use('/users', users);
routes.use('/recipients', recipients);

export default routes;
