import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const exists = await User.findOne({ where: { email: req.body.email } });

    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
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
