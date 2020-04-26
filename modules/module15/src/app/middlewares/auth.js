import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import config from '../../config/auth';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const [, token] = authorization.split(' ');
    const decoded = await promisify(jwt.verify)(token, config.secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: 'Token is invalid' });
  }

  return next();
};
