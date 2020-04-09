import request from 'supertest';
import { formatISO, setHours } from 'date-fns';
import { server } from '@root/app';
import { auth } from '@configurations/application';
import jwt from 'jsonwebtoken';
import { Delivery } from '@models';
import factories from '../factories';

describe('Route -> Deliverymen -> Deliveries', () => {
  describe('Patch', () => {
    it('should return status "OK" and the delivery when it was successfully updated', async () => {
      const { deliveryman_id: man, id } = await factories.create('Delivery');
      const startDate = formatISO(setHours(new Date(), 9));

      const { status, body } = await request(server)
        .patch(`/deliverymen/${man}/deliveries/${id}`)
        .send({
          start_date: startDate,
        });

      expect(status).toBe(200);
      expect(body).toHaveProperty('start_date');
    });

    it('should return status "bad request" when the delivery "start date" is not between 8h and 18h', async () => {
      const { deliveryman_id: man, id } = await factories.create('Delivery');
      const startDate = formatISO(setHours(new Date(), 7));

      const { status, body } = await request(server)
        .patch(`/deliverymen/${man}/deliveries/${id}`)
        .send({
          start_date: startDate,
        });

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('should return status "bad request" and an error when has more than 5 order withdrawals on the day for a deliveryman', async () => {
      // FIXME - Analyze a better solution via factory-girl

      const { id: deliveryman } = await factories.create('Deliveryman');
      const { id: recipient } = await factories.create('Recipient');

      const delivery = await factories.attrs('Delivery', {
        deliveryman_id: deliveryman,
        recipient_id: recipient,
        start_date: new Date(),
      });

      const deliveries = await factories.attrsMany('Delivery', 5, {
        deliveryman_id: deliveryman,
        recipient_id: recipient,
        start_date: new Date(),
      });

      await Delivery.bulkCreate(deliveries);

      const { deliveryman_id: man, id } = await Delivery.create(delivery);

      const { status, body } = await request(server)
        .patch(`/deliverymen/${man}/deliveries/${id}`)
        .send({
          start_date: formatISO(new Date()),
        });

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('should return status "bad request" and an error when "signature_id" and "end_date" are not sent together', async () => {
      const { deliveryman_id: man, id } = await factories.create('Delivery');

      const { status, body } = await request(server)
        .patch(`/deliverymen/${man}/deliveries/${id}`)
        .send({
          end_date: formatISO(new Date()),
        });

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('should return status "bad request" and an error when "start date" and "end_date" are both filled', async () => {
      const { deliveryman_id: man, id } = await factories.create('Delivery');

      const { status, body } = await request(server)
        .patch(`/deliverymen/${man}/deliveries/${id}`)
        .send({
          start_date: formatISO(new Date()),
          end_date: formatISO(new Date()),
          signature_id: 1,
        });

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });

    it('should return status "not found" and an error when the deliveryman or delivery was not found ', async () => {
      const { status, body } = await request(server)
        .patch('/deliverymen/999/deliveries/9999')
        .send({
          start_date: formatISO(new Date()),
        });

      expect(status).toBe(404);
      expect(body).toHaveProperty('error');
    });
  });

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
