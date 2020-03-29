import * as Yup from 'yup';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { ValidationError, NotAuthorizedError } from '@infrastructure/errors';
import { auth } from '@configurations/application';
import TokenController from '@controllers/TokenController';
import RecipientController from '@controllers/RecipientController';

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

const autenticated = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new NotAuthorizedError();
  }

  try {
    const [, token] = authorization.split(' ');
    const decoded = await promisify(jwt.verify)(token, auth.secret);
    req.principal = decoded;
    return next();
  } catch (err) {
    throw new NotAuthorizedError();
  }
};

routes.post(
  '/token',
  validate({ shape: TokenController.SCHEMA_GENERATE, path: 'body' }),
  TokenController.generate
);

routes.use(autenticated);

routes.post(
  '/recipients',
  validate({ shape: RecipientController.SCHEMA_STORE, path: 'body' }),
  RecipientController.store
);

routes.get('/recipients', RecipientController.index);

routes.get('/recipients/:id', RecipientController.show);

routes.put(
  '/recipients/:id',
  validate({ shape: RecipientController.SCHEMA_STORE, path: 'body' }),
  RecipientController.update
);

routes.delete('/recipients/:id', RecipientController.delete);

export default routes;
