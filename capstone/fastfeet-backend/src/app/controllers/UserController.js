import * as Yup from 'yup';

import {
  NotFoundError,
  ValidationError,
  NotAuthorizedError,
} from '@infrastructure/errors';
import { User } from '@models';

class UserController {
  constructor() {
    this.SCHEMA_STORE = {
      name: Yup.string().max(60).required(),
      email: Yup.string().max(60).required(),
      password: Yup.string().min(6).required(),
    };

    this.SCHEMA_UPDATE = {
      name: Yup.string().max(60),
      email: Yup.string().max(60),
      password: Yup.object().shape({
        current: Yup.string(),
        modification: Yup.string()
          .min(6)
          .when('current', (current, field) =>
            current ? field.required() : field
          ),
        confirmation: Yup.string().when('modification', (modification, field) =>
          modification
            ? field.required().oneOf([Yup.ref('modification')])
            : field
        ),
      }),
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
      throw new NotFoundError('User not found');
    }

    return res.json(user);
  }

  async store(req, res) {
    const { email } = req.data;
    const exists = await User.findOne({ where: { email } });

    if (exists) {
      throw new ValidationError('User already exists');
    }

    const user = await User.create(req.data);
    return res.status(201).json(user);
  }

  async update(req, res) {
    const { id } = req.params;

    let user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const {
      password: { current, modification },
      name,
      email,
    } = req.data;

    if (current && !(await user.isCurrentPassword(current))) {
      throw new NotAuthorizedError('Current password does not match');
    }

    user = await user.update({ name, email, password: modification });

    return res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await user.destroy();

    return res.json(user);
  }
}

export default new UserController();
