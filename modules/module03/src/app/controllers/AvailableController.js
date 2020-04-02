import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvailableController {
  async index(req, res) {
    const {
      query: { date },
      params: { id },
    } = req;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const search = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: id,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(search), endOfDay(search)],
        },
      },
    });

    const schedule = [];

    for (let i = 8; i < 20; ++i) {
      schedule.push(i < 10 ? `0${i}:00` : `${i}:00`);
    }

    const availables = schedule.map((time) => {
      const [hour, minute] = time.split(':');

      const value = setSeconds(
        setMinutes(setHours(new Date(search * 1000), hour), minute),
        0
      );

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ss:xxx"),
        available:
          isAfter(value, new Date()) &&
          !appointments.find((a) => format(a.date, 'HH:mm') === time),
      };
    });

    return res.json(availables);
  }
}

export default new AvailableController();
