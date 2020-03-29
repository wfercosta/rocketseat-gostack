import * as Yup from 'yup';

class RecipientController {
  constructor() {
    this.SCHEMA_STORE = {
      street: Yup.string().max(60).required(),
      number: Yup.number().required(),
      complement: Yup.string().max(60),
      state: Yup.string().max(40).required(),
      city: Yup.string().max(40).required(),
      zipcode: Yup.string().max(9).required(),
    };
  }

  async index(req, res) {
    return res.send('ok');
  }

  async show(req, res) {
    return res.send('ok');
  }

  async store(req, res) {
    return res.send('ok');
  }

  async update(req, res) {
    return res.send('ok');
  }

  async delete(req, res) {
    return res.send('ok');
  }
}

export default new RecipientController();
