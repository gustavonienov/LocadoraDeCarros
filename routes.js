import { Router } from "express";
import carController from "./src/Controller/carController.js";
import customerController from "./src/Controller/customerController.js";

const routes = new Router();

routes.get('/api/locadora', carController.index);
routes.get('/car', carController.show);
routes.post('/car', carController.store);
routes.put('/car/:placa',carController.update);
routes.delete('/car/:placa',carController.destroy);

routes.get('/api/clientes', customerController.index);
routes.get('/cust', customerController.show);
routes.post('/cust', customerController.store);
routes.put('/cust/:cpf',customerController.update);
routes.delete('/cust/:cpf',customerController.destroy);

export default routes;