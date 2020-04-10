import { Router } from 'express';

import { autenticated } from '@middlewares';

import RecipientRoute from './RecipientRoute';
import UserRoute from './UserRoute';
import TokenRoute from './TokenRoute';
import DeliverymenRoute from './DeliverymenRoute';
import DeliveryRoute from './DeliveryRoute';
import DeliverymenDeliveriesRoute from './DeliverymenDeliveriesRoute';
import DeliveryProblemsRoute from './DeliveryProblemsRoute';

const routes = new Router();

/**
 * Sessions/ token routes
 */
routes.use('/token', TokenRoute);

/**
 * User routes
 */
routes.use('/users', UserRoute);

/**
 * Recipients routes
 */
routes.use('/recipients', RecipientRoute);

/**
 * Deliverymen routes and sub-routes
 */
routes.use('/deliverymen', DeliverymenDeliveriesRoute);
routes.use('/deliverymen', DeliverymenRoute);

/**
 * Deliveries routes and sub-routes
 */
routes.use('/deliveries', DeliveryRoute);
routes.use('/deliveries', DeliveryProblemsRoute);

export default routes;
