import express from 'express';
import configuration from '@configurations/database';
import Sequelize from 'sequelize';
import { User } from '@models';
import routes from './routes';

const models = [User];

class App {
  constructor() {
    this.server = express();
    this.applyCommonMiddlewares();
    this.applyRoutes();
    this.applyErrorHandling();
    this.applyDatabaseConfiguration();
  }

  applyDatabaseConfiguration() {
    this.connection = new Sequelize(configuration);
    models.map((model) => model.init(this.connection));
  }

  applyCommonMiddlewares() {
    this.server.use(express.json());
  }

  applyRoutes() {
    this.server.use(routes);
  }

  applyErrorHandling() {
    this.server.use((err, req, res, next) => {
      if (err.status) {
        return res.status(err.status).json({ error: err.message });
      }

      return next(err);
    });

    this.server.use((err, req, res, next) => {
      if (res.headersSent) {
        return next(err);
      }
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error.' });
    });
  }
}

export default new App().server;
