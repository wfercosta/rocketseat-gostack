import express from 'express';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.applyCommonMiddlewares();
    this.applyRoutes();
  }

  applyCommonMiddlewares() {
    this.server.use(express.json());
  }

  applyRoutes() {
    this.server.use(routes);
  }
}

export default new App().server;
