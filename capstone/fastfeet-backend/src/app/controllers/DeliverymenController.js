import { Deliveryman } from '@models';
import { NotFoundError } from '@infrastructure/errors';

class DeliverymenController {
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
