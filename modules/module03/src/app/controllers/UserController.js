import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    const exists = await User.findOne({ where: { email: req.body.email } });

    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassoword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('passoword', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    const {
      body: { email: _email, oldPassword },
      user: { id },
    } = req;

    const user = await User.findByPk(id);

    if (_email && _email !== user.email) {
      const exists = await User.findOne({ where: { email: _email } });

      if (exists) {
        return res.status(400).json({ message: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword || ' '))) {
      return res.status(401).json({ message: 'Password does not match' });
    }

    await user.update(req.body);

    const { name, email, provider, avatar } = await User.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({ id, name, email, avatar, provider });
  }
}

export default new UserController();
