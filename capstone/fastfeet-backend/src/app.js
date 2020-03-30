import express from 'express';
import configuration from '@configurations/database';
import Sequelize from 'sequelize';
import { User, Recipient } from '@models';
import routes from '@routes';

import { errorHandling } from '@middlewares';

const models = [User, Recipient];

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
    this.server.use(errorHandling);
  }
}

export default new App().server;
