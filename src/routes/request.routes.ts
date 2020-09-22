import { Router } from 'express';

import RequestController from '../controllers/RequestController';

const requestRoutes = Router();

requestRoutes.get('/pedidos', RequestController.index);

requestRoutes.get('/pedidos/:id', RequestController.show);

requestRoutes.post('/pedir', RequestController.store);

requestRoutes.put('/pedir/:id', RequestController.update);

export default requestRoutes;
