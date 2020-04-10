import * as Yup from 'yup';
import { Delivery, Problem } from '@models/';
import { NotFoundError } from '@infrastructure/errors';

class DeliveryProblemController {
  constructor() {
    this.SCHEMA_CREATE = {
      description: Yup.string().required(),
    };
  }

  async index(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findOne({
      where: { id },
      include: [
        {
          model: Problem,
          as: 'problems',
          attributes: ['id', 'description'],
        },
      ],
    });

    if (!delivery) {
      throw new NotFoundError('Delivery not found');
    }

    return res.json(delivery.problems);
  }

  async create(req, res) {
    const { id } = req.params;

    let delivery = await Delivery.findOne({
      where: { id },
      include: [
        {
          model: Problem,
          as: 'problems',
          attributes: ['id', 'description'],
        },
      ],
    });

    if (!delivery) {
      throw new NotFoundError('Delivery not found');
    }

    delivery = await delivery.update({ problems: req.data });

    return res.json(delivery.problems);
  }
}

export default new DeliveryProblemController();
