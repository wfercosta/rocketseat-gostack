class DeliveryProblemController {
  constructor() {
    this.SCHEMA_CREATE = {};
  }

  async index(req, res) {
    const { id } = req.params;
    return res.json();
  }

  async create(req, res) {
    const { id } = req.params;
    return res.json();
  }
}

export default new DeliveryProblemController();
