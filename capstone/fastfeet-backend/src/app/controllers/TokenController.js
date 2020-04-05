import * as yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '@models/User';
import { auth } from '@configurations/application';
import { NotAuthorizedError } from '@infrastructure/errors';

class TokenController {
  constructor() {
    this.SCHEMA_GENERATE = {
      email: yup.string().required(),
      password: yup.string().required(),
    };
  }

  async generate(req, res) {
    const { email, password } = req.data;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.isCurrentPassword(password))) {
      throw new NotAuthorizedError('Invalid email or password');
    }

    const { id, name } = user;
    const model = { id, name, email };

    return res.json({
      ...model,
      token: jwt.sign(model, auth.secret, {
        expiresIn: auth.expiration,
      }),
    });
  }
}

export default new TokenController();
