import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import ShoppingCart from '../entities/ShoppingCart';

class ProductCartController {
  async store(request: Request, response: Response) {
    // pegar o id do usuario no jsonwebtoken
    const id = '';

    const shoppingCartRepository = getRepository(ShoppingCart);
    return response.send('ok');
  }
}

export default new ProductCartController();
