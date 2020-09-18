import { Router } from 'express';

import ProductsAvaiableController from '../controllers/ProductsAvaiableController';

const productAvaiableRoutes = Router();

productAvaiableRoutes.get('/', ProductsAvaiableController.index);

export default productAvaiableRoutes;
