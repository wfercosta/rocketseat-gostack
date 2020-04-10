import request from 'supertest';
import { formatISO } from 'date-fns';
import { server } from '@root/App';
import { createSession } from '../helpers';
import factories from '../factories';

describe('Route -> Deliveries -> Cancellation', () => {
  let session = {};

  beforeEach(async () => {
    session = await createSession();
  });

  describe('Patch', () => {
    it('should return status "OK" and cancellation when successfuly patched', async () => {
      const { id: delivery } = await factories.create('Delivery');
      const { id: reason } = await factories.create('Problem', {
        delivery_id: delivery,
      });

      const { status, body } = await request(server)
        .patch(`/deliveries/${delivery}/cancellation`)
        .send({ cancelled_at: formatISO(new Date()), reason_id: reason })
        .set('Authorization', `bearer ${session.token}`);

      console.log('body: ', body);

      expect(status).toBe(200);
      expect(body).toHaveProperty('reason');
      expect(body.reason).not.toBeNull();
      expect(body).toHaveProperty('cancelled_at');
    });

    it('should return status "bad request" and an error when the mandatory fields are not filled', async () => {
      const { id } = await factories.create('Delivery');

      const { status, body } = await request(server)
        .patch(`/deliveries/${id}/cancellation`)
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('should return status "not found" and an error when the delivery and problem was not found', async () => {
      const { status, body } = await request(server)
        .patch('/deliveries/9999/cancellation')
        .send({ cancelled_at: formatISO(new Date()), reason_id: 1 })
        .set('Authorization', `bearer ${session.token}`);

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });

    it('should return status "not authorized" when requested without a token', async () => {
      const { status, body } = await request(server).patch(
        '/deliveries/9999/cancellation'
      );

      expect(status).toBe(401);
      expect(body).toHaveProperty('error');
    });
  });
});
