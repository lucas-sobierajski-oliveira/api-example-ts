import { Request, Response } from 'express';

class RequestController {
  async show(request: Request, response: Response) {
    return response.send('ok');
  }

  async store(request: Request, response: Response) {
    return response.send('ok');
  }

  async update(request: Request, response: Response) {
    return response.send('ok');
  }
}

export default new RequestController();
