import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import config from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Password does not match' });
    }

    const { id, name, provider } = user;

    return res.json({
      user: { id, name, email, provider },
      token: jwt.sign({ id, name, provider }, config.secret, {
        expiresIn: config.expiresIn,
      }),
    });
  }
}

export default new SessionController();
