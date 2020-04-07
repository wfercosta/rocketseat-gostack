import { Router } from 'express';

import { autenticated } from '@middlewares';

import RecipientRoute from './RecipientRoute';
import UserRoute from './UserRoute';
import TokenRoute from './TokenRoute';
import DeliverymenRoute from './DeliverymenRoute';

const routes = new Router();

routes.use('/token', TokenRoute);
routes.use('/users', autenticated, UserRoute);
routes.use('/recipients', autenticated, RecipientRoute);
routes.use('/deliverymen', autenticated, DeliverymenRoute);

export default routes;
