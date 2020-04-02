import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.user.id },
      attributes: ['id', 'date', 'past', 'cancellable'],
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'url', 'path'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ message: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You only can create appointments with providers' });
    }

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const availability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (availability) {
      return res
        .status(400)
        .json({ erro: 'Appointment date is not available' });
    }

    const appointment = await Appointment.create({
      user_id: req.user.id,
      provider_id,
      date: hourStart,
    });

    const formatted = format(
      hourStart,
      "'dia ' dd  ' de ' MMMM ', às ' H:mm'h'",
      {
        locale: pt,
      }
    );

    await Notification.create({
      content: `Novo agendamento do ${req.user.name} para o ${formatted}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== req.user.id) {
      return res.status(401).json({
        error: "You don't have permissions to cancel this appointment.",
      });
    }

    const sub = subHours(appointment.date, 2);

    if (isBefore(sub, new Date())) {
      return res
        .status(401)
        .json({ error: 'You can only cancel appointments 2 hours is advance' });
    }

    appointment.canceled_at = new Date();
    await appointment.save();

    await Queue.add(CancellationMail.key, { appointment });

    return res.json(appointment);
  }
}

export default new AppointmentController();
