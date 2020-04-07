import { Deliveryman } from '@models';

class DeliverymenController {
  async index(req, res) {
    const deliverymen = await Deliveryman.findAll();
    return res.json(deliverymen);
  }
}

export default new DeliverymenController();
