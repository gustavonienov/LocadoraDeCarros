import { Router } from "express";
import carController from "./src/Controller/carController.js";
import customerController from "./src/Controller/customerController.js";
import rentController from "./src/Controller/rentController.js";

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

routes.get('/rents', rentController.index);
routes.get('/rent', rentController.show);
routes.post('/rent', rentController.store);
routes.put('/rent/:id',rentController.update);
routes.delete('/rent/:id',rentController.destroy);

export default routes;