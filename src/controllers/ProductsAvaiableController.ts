import { Request, Response } from 'express';

class ProductsAvaiableController {
  async index(request: Request, response: Response) {
    return response.send('ok');
  }
}

export default new ProductsAvaiableController();
