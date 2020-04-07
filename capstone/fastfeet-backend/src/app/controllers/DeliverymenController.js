import * as Yup from 'yup';
import { Deliveryman } from '@models';
import { NotFoundError, ValidationError } from '@infrastructure/errors';

class DeliverymenController {
  constructor() {
    this.SCHEMA_STORE = {
      name: Yup.string().required(),
      email: Yup.string().required(),
    };
  }

  async update(req, res) {
    const { id } = req.params;

    let deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      throw new NotFoundError('Deliveryman not found');
    }

    deliveryman = await deliveryman.update(req.data);

    return res.json(deliveryman);
  }

  async store(req, res) {
    const { email } = req.data;

    const exists = await Deliveryman.findOne({ where: { email } });

    if (exists) {
      throw new ValidationError('Deliveryman already exists');
    }

    const deliveryman = await Deliveryman.create(req.data);
    return res.status(201).json(deliveryman);
  }

  async index(req, res) {
    const deliverymen = await Deliveryman.findAll();
    return res.json(deliverymen);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      throw new NotFoundError('Deliveryman not found');
    }

    return res.json(deliveryman);
  }
}

export default new DeliverymenController();
