import request from 'supertest';
import { server } from '@root/App';
import { createSession } from '../helpers';
import factories from '../factories';

describe('Route -> Deliveries -> Problems', () => {
  let session = {};

  beforeEach(async () => {
    session = await createSession();
  });

  describe('Create', () => {
    it('should return status "OK" and the problem when it was successfully created', async () => {
      const { id } = await factories.create('Delivery');
      const problem = await factories.attrs('Problem');

      const { status, body } = await request(server)
        .post(`/deliveries/${id}/problems`)
        .send(problem);

      expect(status).toBe(200);
      expect(body).toHaveLength(1);
    });

    it('should return status "bad request" an error when the mandatory fields are not filled', async () => {
      const { id } = await factories.create('Delivery');

      const { status, body } = await request(server)
        .post(`/deliveries/${id}/problems`)
        .send({});

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('should return status "not found" and an error when the delivery was not found', async () => {
      const problem = await factories.attrs('Problem');
      const { status, body } = await request(server)
        .post('/deliveries/99999/problems')
        .send(problem);

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });
  });

  describe('Index', () => {
    it('should return status "OK" and a list of all delivery problems', async () => {
      const { id } = await factories.create('Delivery');
      await factories.create('Problem', {
        delivery_id: id,
      });

      const { status, body } = await request(server)
        .get(`/deliveries/${id}/problems`)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(200);
      expect(body).toHaveLength(1);
    });

    it('should return status "not found" and an error when the delivery was not found ', async () => {
      const { status, body } = await request(server)
        .get('/deliveries/99999/problems')
        .set('Authorization', `bearer ${session.token}`);
      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });

    it.skip('should return status "not authorized" when requested without a token ', async () => {
      const { status, body } = await request(server).get(
        '/deliveries/99999/problems'
      );
      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });
  });
});
