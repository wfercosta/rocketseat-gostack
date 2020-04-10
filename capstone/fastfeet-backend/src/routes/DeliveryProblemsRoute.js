import { Router } from 'express';

import { validate, autenticated } from '@middlewares';
import { DeliveryProblemsController } from '@controllers';

const routes = new Router();

routes.post(
  '/:id/problems',
  validate({ shape: DeliveryProblemsController.SCHEMA_CREATE, path: 'body' }),
  DeliveryProblemsController.create
);

routes.get('/:id/problems', autenticated, DeliveryProblemsController.index);

export default routes;
