import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const { id, provider } = req.user;

    if (!provider) {
      return res
        .status(401)
        .json({ error: 'Only provider can load notification' });
    }

    const notifications = await Notification.find({
      user: id,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
