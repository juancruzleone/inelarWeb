import { Router } from 'express';
import * as controllers from '../controllers/controller.api.profile.js';

const route = Router();

route.put('/cuenta/profile', controllers.editProfile);

export default route;
