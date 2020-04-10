import * as Yup from 'yup';
import { Delivery, Problem } from '@models/';
import { NotFoundError } from '@infrastructure/errors';

class DeliveryCancellationController {
  constructor() {
    this.SCHEMA_PATCH = {
      cancelled_at: Yup.date().required(),
      reason_id: Yup.number().required(),
    };
  }

  async patch(req, res) {
    const {
      params: { id },
      data: { reason_id: reasonId },
      cancelled_at: cancelledAt,
    } = req;

    let delivery = await Delivery.findOne({
      where: { id },
      include: [
        {
          model: Problem,
          as: 'problems',
          attributes: ['id'],
          where: {
            id: reasonId,
          },
        },
      ],
    });

    if (!delivery || !delivery.problems) {
      throw new NotFoundError('Delivery or reason not found');
    }

    await delivery.update(req.data);

    delivery = await Delivery.findOne({
      where: { id },
      include: [
        {
          model: Problem,
          as: 'reason',
          attributes: ['id', 'description'],
        },
      ],
    });

    return res.json(delivery);
  }
}

export default new DeliveryCancellationController();
