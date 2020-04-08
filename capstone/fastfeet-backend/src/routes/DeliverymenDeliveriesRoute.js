import { Router } from 'express';

import { validate } from '@middlewares';
import { DeliverymenDeliveriesController } from '@controllers';

const routes = new Router();

routes.get('/:man/deliveries', DeliverymenDeliveriesController.index);

routes.get('/:man/deliveries/:dlv', DeliverymenDeliveriesController.show);

routes.patch(
  '/:man/deliveries/:dlv',
  validate({
    shape: DeliverymenDeliveriesController.SCHEMA_PATCH,
    path: 'body',
  }),
  DeliverymenDeliveriesController.patch
);

export default routes;
