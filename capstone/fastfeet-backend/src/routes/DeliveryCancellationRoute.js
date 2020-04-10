import { Router } from 'express';

import { validate, autenticated } from '@middlewares';
import { DeliveryCancellationController } from '@controllers';

const routes = new Router();

routes.patch(
  '/:id/cancellation',
  autenticated,
  validate({
    shape: DeliveryCancellationController.SCHEMA_PATCH,
    path: 'body',
  }),
  DeliveryCancellationController.patch
);

export default routes;
