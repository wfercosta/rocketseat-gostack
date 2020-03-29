import * as yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '@models/User';
import configuration from '@configurations/application';
import { NotAuthorizedError } from '@infrastructure/errors';

class TokenController {
  constructor() {
    this.SCHEMA_CREATE = {
      email: yup.string().required(),
      password: yup.string().required(),
    };
  }

  async create(req, res) {
    const { email, password } = req.data;
    const user = await User.findOne({ where: { email } });

    if (user && !(await user.isCurrentPassword(password))) {
      throw new NotAuthorizedError();
    }

    const { id, name } = user;
    const model = { id, name, email };

    return res.json({
      ...model,
      token: jwt.sign(model, configuration.auth.secret, {
        expiresIn: configuration.auth.expiration,
      }),
    });
  }
}

export default new TokenController();
