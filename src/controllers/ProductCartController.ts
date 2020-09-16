import { Request, Response } from 'express';

class ProductCartController {
  async store(request: Request, response: Response) {
    return response.send('ok');
  }
}

export default new ProductCartController();
