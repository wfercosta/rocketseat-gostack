export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {},
  default: {
    from: 'Equipe Gobarber <noreply@gobarber.com> ',
  },
};
