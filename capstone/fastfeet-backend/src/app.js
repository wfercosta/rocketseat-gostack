import express from 'express';
import 'express-async-errors';
import configuration from '@configurations/database';
import Sequelize from 'sequelize';
import { User, Recipient, File, Deliveryman } from '@models';
import routes from '@routes';

import { resolve } from 'path';

import { errorHandling } from '@middlewares';

const models = [User, Recipient, Deliveryman, File];

class App {
  constructor() {
    this.server = express();
    this.applyDatabaseConfiguration();
    this.applyCommonMiddlewares();
    this.applyRoutes();
    this.applyErrorHandling();
  }

  applyDatabaseConfiguration() {
    this.database = new Sequelize(configuration);
    models
      .map((model) => model.init(this.database))
      .map((model) => model.associate && model.associate(this.database.models));
  }

  applyCommonMiddlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  applyRoutes() {
    this.server.use(routes);
  }

  applyErrorHandling() {
    this.server.use(errorHandling);
  }
}

const { server, database } = new App();

export { server, database };
