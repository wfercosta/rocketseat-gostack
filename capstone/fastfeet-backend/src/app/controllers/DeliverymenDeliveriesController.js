import { Deliveryman, Delivery } from '@models';
import { NotFoundError } from '@infrastructure/errors';

class DeliverymenDeliveriesController {
  constructor() {
    this.SCHEMA_PATCH = {};
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
    return res.json();
  }

  async patch(req, res) {
    const { man, dlv } = req.params;
    return res.json();
  }
}

export default new DeliverymenDeliveriesController();
