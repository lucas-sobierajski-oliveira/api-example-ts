import { Router } from 'express';

import ProductsController from '../controllers/ProductsController';

const productsRoutes = Router();

productsRoutes.get('/', ProductsController.index);

productsRoutes.get('/:id', ProductsController.show);

productsRoutes.post('/', ProductsController.store);

productsRoutes.put('/:id', ProductsController.update);

productsRoutes.delete('/:id', ProductsController.remove);

export default productsRoutes;
