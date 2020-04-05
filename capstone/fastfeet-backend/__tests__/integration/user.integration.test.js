import request from 'supertest';
import { server } from '@root/app';
import { auth } from '@configurations/application';
import jwt from 'jsonwebtoken';
import factories from '../factories';
import truncate from '../helpers';

describe('Route -> User', () => {
  let session = {};

  beforeEach(async () => {
    await truncate();

    const { id, name, email } = await factories.create('User');
    const model = { id, name, email };

    session = {
      ...model,
      token: jwt.sign(model, auth.secret, {
        expiresIn: auth.expiration,
      }),
    };
  });

  it('should return status "not authorized" when requested without a token', async () => {
    const { status } = await request(server).get('/users');
    expect(status).toBe(401);
  });

  it('should return status "OK" and a list of all users', async () => {
    await factories.createMany('User', 5);

    const { status, body } = await request(server)
      .get('/users')
      .set('Authorization', `bearer ${session.token}`);

    expect(status).toBe(200);
    expect(body.length).toBeGreaterThanOrEqual(5);
  });
});
