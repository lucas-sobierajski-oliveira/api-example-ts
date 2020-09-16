import { Router } from 'express';

import productsRoutes from './products.routes';
import productsAvaiableRoutes from './productsAvaiable.routes';
import productCartRoutes from './productCart.routes';
import requestRoutes from './request.routes';

const routes = Router();

routes.use('/produtos', productsRoutes);
routes.use('/produtos_disponiveis', productsAvaiableRoutes);
routes.use('/carrinho_produto', productCartRoutes);
routes.use('/pedidos', requestRoutes);

export default routes;
