import request from 'supertest';
import { server } from '@root/app';
import { auth } from '@configurations/application';
import jwt from 'jsonwebtoken';
import factories from '../factories';

describe('Route -> Deliverymen', () => {
  let session = {};

  beforeEach(async () => {
    const { id, name, email } = await factories.create('User');
    const model = { id, name, email };

    session = {
      ...model,
      token: jwt.sign(model, auth.secret, {
        expiresIn: auth.expiration,
      }),
    };
  });

  describe('Index', () => {
    it('should return status "not authorized" when requested without a token', async () => {
      const { status, body } = await request(server).get('/deliverymen');
      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });

    it('should return status "OK" and a list of all deliveryman', async () => {
      await factories.create('Deliveryman');

      const { status, body } = await request(server)
        .get('/deliverymen')
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(200);
      expect(body.length).toBeGreaterThanOrEqual(1);
    });
  });
});
