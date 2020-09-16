import { Router } from 'express';

import RequestController from '../controllers/RequestController';

const requestRoutes = Router();

requestRoutes.get('/:id', RequestController.show);

requestRoutes.put('/:id', RequestController.update);

export default requestRoutes;
