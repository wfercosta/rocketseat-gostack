import * as Yup from 'yup';
import { Router } from 'express';

import { ValidationError } from '@infrastructure/errors';
import TokenController from '@controllers/TokenController';

const routes = new Router();

const validate = ({ shape, path = 'query' }) => async (req, res, next) => {
  const schema = Yup.object().shape(shape);

  try {
    const validated = await schema.validate(req[path]);
    req.data = validated;
    return next();
  } catch (err) {
    throw new ValidationError();
  }
};

routes.post(
  '/token',
  validate({ shape: TokenController.SCHEMA_CREATE, path: 'body' }),
  TokenController.create
);

export default routes;
