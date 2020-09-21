import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Products from '../entities/Products';

import AppError from '../errors/AppError';

class ProductsAvaiableController {
  async index(request: Request, response: Response) {
    const productsRepository = getRepository(Products);

    const allProductsAvaiable = await productsRepository.find({
      isActive: true,
    });

    if (allProductsAvaiable.length < 1) {
      throw new AppError('Sem produtos disponiveis', 404);
    }

    return response.send(allProductsAvaiable);
  }
}

export default new ProductsAvaiableController();
