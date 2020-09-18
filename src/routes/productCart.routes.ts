import { Router } from 'express';

import ProductCartController from '../controllers/ProductCartController';

const productCartRoutes = Router();

productCartRoutes.post('/', ProductCartController.store);

export default productCartRoutes;
