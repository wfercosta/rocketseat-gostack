import * as Yup from 'yup';
import { Delivery, Recipient, Deliveryman, File } from '@models';
import { NotFoundError } from '@infrastructure/errors';

class DeliveryController {
  constructor() {
    this.SCHEMA_STORE = {
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    };

    this.SCHEMA_UPDATE = {
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
    };
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      throw new NotFoundError('Delivery not found');
    }

    await delivery.destroy();

    return res.json(delivery);
  }

  async update(req, res) {
    const { id } = req.params;

    let delivery = await Delivery.findByPk(id);

    if (!delivery) {
      throw new NotFoundError('Delivery not found');
    }

    delivery = await delivery.update(req.data);

    return res.json(delivery);
  }

  async store(req, res) {
    const delivery = await Delivery.create(req.data);
    return res.status(201).json(delivery);
  }

  async index(req, res) {
    const deliveries = await Delivery.findAll({
      include: [
        {
          model: Recipient,
          as: 'recipient',
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          include: [
            {
              model: File,
              as: 'avatar',
            },
          ],
        },
      ],
    });
    return res.json(deliveries);
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      throw new NotFoundError('Delivery not found');
    }

    return res.json(delivery);
  }
}

export default new DeliveryController();
