import * as Yup from 'yup';
import { Op } from 'sequelize';
import { parseISO, startOfDay, endOfDay, getHours } from 'date-fns';
import { Deliveryman, Delivery } from '@models';
import { NotFoundError, ValidationError } from '@infrastructure/errors';

class DeliverymenDeliveriesController {
  constructor() {
    this.SCHEMA_PATCH = {
      start_date: Yup.date(),
      end_date: Yup.date().when('signature_id', (value, field) =>
        value ? field.required() : field
      ),
      signature_id: Yup.number(),
    };
  }

  async index(req, res) {
    const { man } = req.params;
    const deliveryman = await Deliveryman.findByPk(man);

    if (!deliveryman) {
      throw new NotFoundError('Deliveryman not found exception');
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: man,
        end_date: null,
        cancelled_at: null,
      },
    });

    return res.json(deliveries);
  }

  async show(req, res) {
    const { man, dlv } = req.params;

    const deliveryman = await Deliveryman.findByPk(man);

    if (!deliveryman) {
      throw new NotFoundError('Deliveryman not found exception');
    }

    const delivery = await Delivery.findOne({
      where: { id: dlv, deliveryman_id: man },
    });

    if (!delivery) {
      throw new NotFoundError('Delivery not found for deliveryman');
    }

    return res.json(delivery);
  }

  async patch(req, res) {
    const { man, dlv } = req.params;

    const {
      start_date: startDate,
      end_date: endDate,
      signature_id: signatureId,
    } = req.data;

    if (startDate && endDate) {
      throw new ValidationError(
        'You cannot update start_date and end_date at the same time'
      );
    }

    if ((endDate || signatureId) && !(endDate && signatureId)) {
      throw new ValidationError(
        'Both are required, end_date and signature_id.'
      );
    }

    const deliveryman = await Deliveryman.findByPk(man);

    if (!deliveryman) {
      throw new NotFoundError('Deliveryman not found exception');
    }

    let delivery = await Delivery.findOne({
      where: { id: dlv, deliveryman_id: man },
    });

    if (!delivery) {
      throw new NotFoundError('Delivery not found for deliveryman');
    }

    const hour = getHours(startDate);

    if (hour < 8 || hour > 18) {
      throw new ValidationError('Start hour must be between 8h and 18h');
    }

    const deliveriesToday = await Delivery.findAll({
      where: {
        deliveryman_id: man,
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
      },
    });

    if (deliveriesToday && deliveriesToday.length >= 5) {
      throw new ValidationError(
        'You have more than 5 order withdrawals on the day for a deliveryman'
      );
    }

    delivery = await delivery.update(req.data);

    return res.json(delivery);
  }
}

export default new DeliverymenDeliveriesController();
