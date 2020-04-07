import { Router } from 'express';

import { validate } from '@middlewares';
import { DeliverymenController } from '@controllers';

const routes = new Router();

routes.get('/', DeliverymenController.index);

routes.get('/:id', DeliverymenController.show);

routes.post(
  '/',
  validate({ shape: DeliverymenController.SCHEMA_STORE, path: 'body' }),
  DeliverymenController.store
);

routes.put(
  '/:id',
  validate({ shape: DeliverymenController.SCHEMA_STORE, path: 'body' }),
  DeliverymenController.update
);

routes.delete('/:id', DeliverymenController.delete);

export default routes;
