import ProductCartController from 'controllers/ProductCartController';
import { Router } from 'express';

const productCartRoutes = Router();

productCartRoutes.post('/', ProductCartController.store);

export default productCartRoutes;
