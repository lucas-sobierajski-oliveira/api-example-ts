import { Router } from 'express';

import RequestController from '../controllers/RequestController';

const requestRoutes = Router();

requestRoutes.get('/', RequestController.index);

requestRoutes.get('/:id', RequestController.show);

requestRoutes.post('/', RequestController.store);

requestRoutes.put('/:id', RequestController.update);

export default requestRoutes;
