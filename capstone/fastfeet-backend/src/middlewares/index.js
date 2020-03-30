import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { ValidationError, NotAuthorizedError } from '@infrastructure/errors';
import { auth } from '@configurations/application';

const errorHandling = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  // eslint-disable-next-line no-console
  console.error(err);
  return res.status(500).json({ error: 'Internal Server Error.' });
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
