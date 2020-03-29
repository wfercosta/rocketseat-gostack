import * as Yup from 'yup';

import { NotFoundError } from '@infrastructure/errors';
import { User } from '@models';

class UserController {
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
    const users = await User.findAll();
    return res.json(users);
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundError();
    }

    return res.json(user);
  }

  async store(req, res) {
    const user = await User.create(req.data);
    return res.status(201).json(user);
  }

  async update(req, res) {
    const { id } = req.params;

    let user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundError();
    }

    user = await user.update(req.data);

    return res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundError();
    }

    user.destroy();

    return res.json(user);
  }
}

export default new UserController();
