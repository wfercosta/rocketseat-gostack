import { Router } from 'express';

import { validate } from '@middlewares';
import { DeliverymenDeliveriesController } from '@controllers';

const routes = new Router();

routes.get('/', DeliverymenDeliveriesController.index);

routes.get('/:dlv', DeliverymenDeliveriesController.show);

routes.patch(
  '/:dlv',
  validate({
    shape: DeliverymenDeliveriesController.SCHEMA_PATCH,
    path: 'body',
  }),
  DeliverymenDeliveriesController.patch
);

export default routes;
