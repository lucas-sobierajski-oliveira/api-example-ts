import ProductsAvaiableController from 'controllers/ProductsAvaiableController';
import { Router } from 'express';

const productAvaiableRoutes = Router();

productAvaiableRoutes.get('/', ProductsAvaiableController.index);

export default productAvaiableRoutes;
