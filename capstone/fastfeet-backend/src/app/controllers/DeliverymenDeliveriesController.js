class DeliverymenDeliveriesController {
  constructor() {
    this.SCHEMA_PATCH = {};
  }

  async index(req, res) {
    const { man } = req.params;
    return res.json();
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
