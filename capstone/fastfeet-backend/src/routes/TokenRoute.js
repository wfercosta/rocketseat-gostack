import { Router } from 'express';

import { validate } from '@middlewares';
import { TokenController } from '@controllers';

const routes = new Router();

routes.post(
  '/',
  validate({ shape: TokenController.SCHEMA_GENERATE, path: 'body' }),
  TokenController.generate
);

export default routes;
