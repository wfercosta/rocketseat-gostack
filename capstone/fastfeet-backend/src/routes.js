import { Router } from 'express';

import TokenController from '@controllers/TokenController';

const routes = new Router();

routes.post('/token', TokenController.create);

export default routes;
