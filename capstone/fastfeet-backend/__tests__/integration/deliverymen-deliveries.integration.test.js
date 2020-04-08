import request from 'supertest';
import { server } from '@root/app';
import { auth } from '@configurations/application';
import jwt from 'jsonwebtoken';
import { Deliveryman } from '@models';
import factories from '../factories';

describe('Route -> Deliverymen -> Deliveries', () => {
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

  describe('Patch', () => {});

  describe('Show', () => {
    it('should return status "OK" and the deliveryman and delivery when it was successfully found', async () => {
      const { deliveryman_id: man, id } = await factories.create('Delivery');

      const { status, body } = await request(server).get(
        `/deliverymen/${man}/deliveries/${id}`
      );

      expect(status).toBe(200);
      expect(body).toHaveProperty('id', id);
    });

    it('should return status "not found" and an error when the deliveryman or delivery was not found', async () => {
      const { status, body } = await request(server).get(
        '/deliverymen/999/deliveries/9999'
      );

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Index', () => {
    it('should return status "OK" and a list of all deliveries that has not status of "deliveried" or "cancelled"', async () => {
      const { deliveryman_id: man } = await factories.create('Delivery');

      const { status, body } = await request(server).get(
        `/deliverymen/${man}/deliveries`
      );

      expect(status).toBe(200);
      expect(body.length).toBeGreaterThanOrEqual(1);
    });

    it('should return status "not found" and an error when the deliveryman was not found', async () => {
      const { status, body } = await request(server).get(
        '/deliverymen/999/deliveries'
      );

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });
  });
});
