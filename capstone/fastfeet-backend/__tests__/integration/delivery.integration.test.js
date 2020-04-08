import request from 'supertest';
import { server } from '@root/app';
import { auth } from '@configurations/application';
import jwt from 'jsonwebtoken';
import { Delivery } from '@models';
import factories from '../factories';

describe('Route -> Delivery', () => {
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

  describe('Delete', () => {
    it('should return status "OK" and the delivery when it is successfully deleted', async () => {
      const { id } = await factories.create('Delivery');

      const { status, body } = await request(server)
        .delete(`/deliveries/${id}`)
        .set('Authorization', `bearer ${session.token}`);

      const delivery = await Delivery.findByPk(id);

      expect(status).toBe(200);
      expect(body).toHaveProperty('id', id);
      expect(delivery).toBeNull();
    });

    it('should return status "not found" and an error when the delivery was not found', async () => {
      const { status, body } = await request(server)
        .delete('/deliveries/9999')
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });

    it('should return status "not authorized" when requested without a token', async () => {
      const { status, body } = await request(server).delete('/deliveries/1');
      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Update', () => {
    it('should return status "OK" and the delivery when it is successfully updated', async () => {
      const { id } = await factories.create('Delivery');
      const delivery = await factories.attrs('Delivery');

      const { status, body } = await request(server)
        .put(`/deliveries/${id}`)
        .send(delivery)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(200);
      expect(body).toHaveProperty('name', delivery.name);
    });

    it('should return status "not found" and an error when the delivery was not found', async () => {
      const delivery = await factories.attrs('Delivery');

      const { status, body } = await request(server)
        .put('/deliveries/9999')
        .send(delivery)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });

    it('should return status "not authorized" when requested without a token', async () => {
      const { status, body } = await request(server).put('/deliveries/1');
      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Store', () => {
    it('should return status "created" and the delivery when it is successfully created', async () => {
      const { id: recipient } = await factories.create('Recipient');
      const { id: deliveryman } = await factories.create('Deliveryman');

      const delivery = await factories.attrs('Delivery', {
        recipient_id: recipient,
        deliveryman_id: deliveryman,
      });

      const { status, body } = await request(server)
        .post('/deliveries')
        .send(delivery)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(201);
      expect(body).toHaveProperty('id');
    });

    it('should return status "bad request" and an error when the mandatory fields are not filled', async () => {
      const { status, body } = await request(server)
        .post('/deliveries')
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('should return status "not authorized" when requested without a token', async () => {
      const { status, body } = await request(server).post('/deliveries');
      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Show', () => {
    it('should return status "not found" and an error when the delivery was not found', async () => {
      const { status, body } = await request(server)
        .get('/deliveries/9999')
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });

    it('should return status "OK" and the delivery when it was successfully found', async () => {
      const { id } = await factories.create('Delivery');

      const { status, body } = await request(server)
        .get(`/deliveries/${id}`)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(200);
      expect(body).toHaveProperty('id', id);
    });
    it('should return status "not authorized" when requested without a token', async () => {
      const { status, body } = await request(server).get('/deliveries/1');
      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Index', () => {
    it('should return status "not authorized" when requested without a token', async () => {
      const { status, body } = await request(server).get('/deliveries');
      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });

    it('should return status "OK" and a list of all deliveries', async () => {
      await factories.create('Delivery');

      const { status, body } = await request(server)
        .get('/deliveries')
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(200);
      expect(body.length).toBeGreaterThanOrEqual(1);
    });
  });
});
