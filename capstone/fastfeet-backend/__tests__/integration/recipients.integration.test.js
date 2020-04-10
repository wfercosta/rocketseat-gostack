import request from 'supertest';
import { server } from '@root/App';
import { Recipient } from '@models';
import factories from '../factories';
import { createSession } from '../helpers';

describe('Route -> Recipients ', () => {
  let session = {};

  beforeEach(async () => {
    session = await createSession();
  });

  describe('Index', () => {
    it('should return status "not authorized" when requested without a token ', async () => {
      const { status, body } = await request(server).get('/recipients');

      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });

    it('should return status "OK" and a list of all recipients', async () => {
      await factories.createMany('Recipient', 5);
      const { status, body } = await request(server)
        .get('/recipients')
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(200);
      expect(body.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Show', () => {
    it('should return status "not authorized" when requested without a token ', async () => {
      const { status, body } = await request(server).get('/recipients/1');

      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });

    it('should return status "OK" and the recipient when it was successfully found ', async () => {
      const { id } = await factories.create('Recipient');

      const { status, body } = await request(server)
        .get(`/recipients/${id}`)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(200);
      expect(body).toHaveProperty('id');
    });

    it('should return status "not found" and an error when the recipient was not found', async () => {
      const { status, body } = await request(server)
        .get('/recipients/9999')
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Store', () => {
    it('should return status "not authorized" when requested without a token ', async () => {
      const { status, body } = await request(server).post('/recipients');

      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });

    it('should return status "bad request" and an error when the mandatory fields are not filled ', async () => {
      const { status, body } = await request(server)
        .post('/recipients')
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('should return status "created" and the recipient when it is successfully created', async () => {
      const recipient = await factories.attrs('Recipient');

      const { status, body } = await request(server)
        .post('/recipients')
        .send(recipient)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(201);
      expect(body).toHaveProperty('id');
    });
  });

  describe('Update', () => {
    it('should return status "not authorized" when requested without a token ', async () => {
      const { status, body } = await request(server).put('/recipients/1');

      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });

    it('should return status "bad request" and an error when the mandatory fields are not filled ', async () => {
      const { status, body } = await request(server)
        .put('/recipients/1')
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('should return status "not found" and an error when the recipient was not found', async () => {
      const recipient = await factories.attrs('Recipient');

      const { status, body } = await request(server)
        .put('/recipients/9999')
        .send(recipient)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });

    it('should return status "OK" and the recipient when it is successfully updated', async () => {
      const { id } = await factories.create('Recipient');
      const update = await factories.attrs('Recipient');

      const { status, body } = await request(server)
        .put(`/recipients/${id}`)
        .send(update)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(200);
      expect(body).toHaveProperty('id');
    });
  });

  describe('Delete', () => {
    it('should return status "not authorized" when requested without a token ', async () => {
      const { status, body } = await request(server).delete('/recipients/1');

      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });

    it('should return status "OK" and the recipient when it is successfully deleted ', async () => {
      const { id } = await factories.create('Recipient');

      const { status, body } = await request(server)
        .delete(`/recipients/${id}`)
        .set('Authorization', `bearer ${session.token}`);

      const recipient = await Recipient.findByPk(id);

      expect(status).toBe(200);
      expect(body).toHaveProperty('id');
      expect(recipient).toBeNull();
    });

    it('should return status "not found" and an error when the recipient was not found', async () => {
      const { id } = await factories.create('Recipient');

      await request(server)
        .delete(`/recipients/${id}`)
        .set('Authorization', `bearer ${session.token}`);

      const { status, body } = await request(server)
        .delete(`/recipients/${id}`)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });
  });
});
