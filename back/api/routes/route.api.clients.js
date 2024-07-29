import { Router } from 'express';
import * as controllers from '../controllers/controller.api.clientes.js';
import { validateCliente, validateClientePatch } from '../../middleware/clients.validate.middleware.js';
import { isAdmin } from '../../middleware/auth.role.middleware.js'; // Importa el middleware

const route = Router();

route.get('/clientes', controllers.getClients);
route.get('/clientes/:id', controllers.getClientById);
route.post('/clientes', isAdmin ,[validateCliente], controllers.addClient);
route.put('/clientes/:id', isAdmin , [validateCliente], controllers.putClient);
route.patch('/clientes/:id', isAdmin , [validateClientePatch], controllers.patchClient);
route.delete('/clientes/:id', isAdmin ,controllers.deleteClient);

export default route;
