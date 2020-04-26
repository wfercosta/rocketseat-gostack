import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const {
      user: { id, provider },
      query: { date },
    } = req;

    if (!provider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const parsed = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: id,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsed), endOfDay(parsed)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      order: ['date'],
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
