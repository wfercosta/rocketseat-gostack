import { Router } from 'express';

import { validate } from '@middlewares';
import { UserController } from '@controllers';

const routes = new Router();

routes.post(
  '/',
  validate({ shape: UserController.SCHEMA_STORE, path: 'body' }),
  UserController.store
);

routes.get('/', UserController.index);

routes.get('/:id', UserController.show);

routes.put(
  '/:id',
  validate({ shape: UserController.SCHEMA_STORE, path: 'body' }),
  UserController.update
);

routes.delete('/:id', UserController.delete);

export default routes;
