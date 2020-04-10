import { Router } from 'express';

import { validate, autenticated } from '@middlewares';
import { DeliveryController } from '@controllers';

const routes = new Router();

routes.use(autenticated);

routes.get('/', DeliveryController.index);

routes.get('/:id', DeliveryController.show);

routes.post(
  '/',
  validate({ shape: DeliveryController.SCHEMA_STORE, path: 'body' }),
  DeliveryController.store
);

routes.put(
  '/:id',
  validate({ shape: DeliveryController.SCHEMA_UPDATE, path: 'body' }),
  DeliveryController.update
);

routes.delete('/:id', DeliveryController.delete);

export default routes;
