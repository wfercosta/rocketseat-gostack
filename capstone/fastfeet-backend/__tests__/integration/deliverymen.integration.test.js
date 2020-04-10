import request from 'supertest';
import { server } from '@root/App';
import { auth } from '@configurations/application';
import jwt from 'jsonwebtoken';
import { Deliveryman } from '@models';
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

  describe('Delete', () => {
    it('should return status "OK" and the deliveryman when it is successfully deleted', async () => {
      const { id } = await factories.create('Deliveryman');

      const { status, body } = await request(server)
        .delete(`/deliverymen/${id}`)
        .set('Authorization', `bearer ${session.token}`);

      const deliveryman = await Deliveryman.findByPk(id);

      expect(status).toBe(200);
      expect(body).toHaveProperty('id', id);
      expect(deliveryman).toBeNull();
    });

    it('should return status "not found" and an error when the deliveryman was not found', async () => {
      const { status, body } = await request(server)
        .delete('/deliverymen/9999')
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });

    it('should return status "not authorized" when requested without a token', async () => {
      const { status, body } = await request(server).delete('/deliverymen/1');
      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Update', () => {
    it('should return status "OK" and the deliveryman when it is successfully updated', async () => {
      const { id } = await factories.create('Deliveryman');
      const deliveryman = await factories.attrs('Deliveryman');

      const { status, body } = await request(server)
        .put(`/deliverymen/${id}`)
        .send(deliveryman)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(200);
      expect(body).toHaveProperty('name', deliveryman.name);
    });

    it('should return status "not found" and an error when the deliveryman was not found', async () => {
      const deliveryman = await factories.attrs('Deliveryman');

      const { status, body } = await request(server)
        .put('/deliverymen/9999')
        .send(deliveryman)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });

    it('should return status "bad request" and an error when the mandatory fields are not filled ', async () => {
      const { status, body } = await request(server)
        .put('/deliverymen/1')
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('should return status "not authorized" when requested without a token', async () => {
      const { status, body } = await request(server).put('/deliverymen/1');
      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Store', () => {
    it('should return status "bad request" and an error when the email is duplicated', async () => {
      const existent = await factories.create('Deliveryman');
      const deliveryman = await factories.attrs('Deliveryman', {
        email: existent.email,
      });

      const { status, body } = await request(server)
        .post('/deliverymen')
        .send(deliveryman)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('should return status "created" and the deliveryman when it is successfully created', async () => {
      const deliveryman = await factories.attrs('Deliveryman');
      const { status, body } = await request(server)
        .post('/deliverymen')
        .send(deliveryman)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(201);
      expect(body).toHaveProperty('id');
    });

    it('should return status "bad request" and an error when the mandatory fields are not filled', async () => {
      const { status, body } = await request(server)
        .post('/deliverymen')
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('should return status "not authorized" when requested without a token', async () => {
      const { status, body } = await request(server).post('/deliverymen');
      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Show', () => {
    it('should return status "not found" and an error when the deliveryman was not found', async () => {
      const { status, body } = await request(server)
        .get('/deliverymen/9999')
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });

    it('should return status "OK" and the deliveryman when it was successfully found', async () => {
      const { id } = await factories.create('Deliveryman');

      const { status, body } = await request(server)
        .get(`/deliverymen/${id}`)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(200);
      expect(body).toHaveProperty('id', id);
    });
    it('should return status "not authorized" when requested without a token', async () => {
      const { status, body } = await request(server).get('/deliverymen/1');
      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });
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
