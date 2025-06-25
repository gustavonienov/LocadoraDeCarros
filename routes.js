import { Router } from "express";
import carController from "./src/Controller/carController.js";
const routes = new Router();

routes.get('/cars', carController.index);
routes.get('/car', carController.show);
routes.post('/car', carController.store);
routes.put('/car/:placa',carController.update);
routes.delete('/car/:placa',carController.destroy);

export default routes;