import jwt from 'jsonwebtoken';
import { database } from '@root/App';
import { auth } from '@configurations/application';
import factories from '../factories';

const truncate = () => {
  Object.keys(database.models).map((key) => {
    return database.models[key].destroy({
      truncate: true,
      force: true,
    });
  });
};

const createSession = async () => {
  const { id, name, email } = await factories.create('User');
  const model = { id, name, email };

  return {
    ...model,
    token: jwt.sign(model, auth.secret, {
      expiresIn: auth.expiration,
    }),
  };
};

export { truncate, createSession };
