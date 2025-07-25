import { Router } from "express";
import carController from "./src/Controllers/carController.js";
import customerController from "./src/Controllers/customerController.js";
import rentController from "./src/Controllers/rentController.js";

const routes = new Router();

routes.get('/cars', carController.index);
routes.get('/car', carController.show);
routes.post('/car', carController.store);
routes.put('/car/:id',carController.update);
routes.delete('/car/:id',carController.destroy);

routes.get('/customers', customerController.index);
routes.get('/customer', customerController.show);
routes.post('/customer', customerController.store);
routes.put('/customer/:id',customerController.update);
routes.delete('/customer/:id',customerController.destroy);

routes.get('/rents', rentController.index);
routes.get('/rent', rentController.show);
routes.post('/rent', rentController.store);
routes.put('/rent/:id',rentController.update);
routes.delete('/rent/:id',rentController.destroy);

export default routes;