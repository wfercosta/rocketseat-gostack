import { Router } from 'express';

import { validate } from '@middlewares';
import { RecipientController } from '@controllers';

const routes = new Router();

routes.post(
  '/',
  validate({ shape: RecipientController.SCHEMA_STORE, path: 'body' }),
  RecipientController.store
);

routes.get('/', RecipientController.index);

routes.get('/:id', RecipientController.show);

routes.put(
  '/:id',
  validate({ shape: RecipientController.SCHEMA_STORE, path: 'body' }),
  RecipientController.update
);

routes.delete('/:id', RecipientController.delete);
export default routes;
