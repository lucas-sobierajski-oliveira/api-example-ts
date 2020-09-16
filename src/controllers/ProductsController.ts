import { Request, Response } from 'express';

class ProductsController {
  async index(request: Request, response: Response) {
    return response.send('ok');
  }

  async show(request: Request, response: Response) {
    return response.send('ok');
  }

  async store(request: Request, response: Response) {
    return response.send('ok');
  }

  async update(request: Request, response: Response) {
    return response.send('ok');
  }

  async remove(request: Request, response: Response) {
    return response.send('ok');
  }
}

export default new ProductsController();
