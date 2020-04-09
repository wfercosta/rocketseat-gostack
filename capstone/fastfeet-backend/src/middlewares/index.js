import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import Youch from 'youch';

import { ValidationError, NotAuthorizedError } from '@infrastructure/errors';
import { auth } from '@configurations/application';

const errorHandling = async (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  console.log(err);
  const errors = await new Youch(err, req).toJSON();

  return res.status(500).json({ error: errors });
};

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

export { validate, autenticated, errorHandling };
