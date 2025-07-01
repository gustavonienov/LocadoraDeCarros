import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import path from 'path'; // Adicione esta linha
import "./src/db/index.js"; 

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.static(path.resolve('src', 'View')));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;