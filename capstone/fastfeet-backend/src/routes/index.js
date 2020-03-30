import { Router } from 'express';

import { autenticated } from '@middlewares';

import RecipientRoute from './RecipientRoute';
import UserRoute from './UserRoute';
import TokenRoute from './TokenRoute';

const routes = new Router();

routes.use('/token', TokenRoute);
routes.use('/users', autenticated, UserRoute);
routes.use('/recipients', autenticated, RecipientRoute);

export default routes;
