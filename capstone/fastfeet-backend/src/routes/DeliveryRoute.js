import { Router } from 'express';

import { validate, autenticated } from '@middlewares';
import { DeliveryController } from '@controllers';

const routes = new Router();

routes.get('/', autenticated, DeliveryController.index);

routes.get('/:id', autenticated, DeliveryController.show);

routes.post(
  '/',
  autenticated,
  validate({ shape: DeliveryController.SCHEMA_STORE, path: 'body' }),
  DeliveryController.store
);

routes.put(
  '/:id',
  autenticated,
  validate({ shape: DeliveryController.SCHEMA_UPDATE, path: 'body' }),
  DeliveryController.update
);

routes.delete('/:id', autenticated, DeliveryController.delete);

export default routes;
