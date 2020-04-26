import nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import configuration from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = configuration;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth && auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  send(message) {
    return this.transporter.sendMail({
      ...configuration.default,
      ...message,
    });
  }
}

export default new Mail();
