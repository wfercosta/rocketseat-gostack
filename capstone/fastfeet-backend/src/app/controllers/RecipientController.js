import * as Yup from 'yup';

import { NotFoundError } from '@infrastructure/errors';
import { Recipient } from '@models';

class RecipientController {
  constructor() {
    this.SCHEMA_STORE = {
      name: Yup.string().max(60).required(),
      street: Yup.string().max(60).required(),
      number: Yup.number().required(),
      complement: Yup.string().max(60),
      state: Yup.string().max(40).required(),
      city: Yup.string().max(40).required(),
      zipcode: Yup.string().max(9).required(),
    };
  }

  async index(req, res) {
    const recipients = await Recipient.findAll();
    return res.json(recipients);
  }

  async show(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      throw new NotFoundError('Recipient Not Found');
    }

    return res.json(recipient);
  }

  async store(req, res) {
    const recipient = await Recipient.create(req.data);
    return res.status(201).json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;

    let recipient = await Recipient.findByPk(id);

    if (!recipient) {
      throw new NotFoundError('Recipient Not Found');
    }

    recipient = await recipient.update(req.data);

    return res.json(recipient);
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      throw new NotFoundError('Recipient Not Found');
    }

    recipient.destroy();

    return res.json(recipient);
  }
}

export default new RecipientController();
