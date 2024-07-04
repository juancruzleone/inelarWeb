import { Router } from 'express';
import * as controllers from '../controllers/controller.api.clientes.js';
import { validateCliente, validateClientePatch } from '../../middleware/clients.validate.middleware.js';

const route = Router();

route.get('/clientes', controllers.getClients);
route.get('/clientes/:id', controllers.getClientById);
route.post('/clientes', [validateCliente], controllers.addClient);
route.put('/clientes/:id', [validateCliente], controllers.putClient);
route.patch('/clientes/:id', [validateClientePatch], controllers.patchClient);
route.delete('/clientes/:id', controllers.deleteClient);

export default route;
