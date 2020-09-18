import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Products from '../entities/Products';

class ProductsController {
  async index(request: Request, response: Response) {
    const productsRepository = getRepository(Products);

    const allProducts = await productsRepository.find();

    if (allProducts.length < 1) {
      throw new AppError('Sem produtos', 404);
    }

    return response.send(allProducts);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const productsRepository = getRepository(Products);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Produto inexistente', 404);
    }

    return response.send(product);
  }

  async store(request: Request, response: Response) {
    const { name, cost, is_active } = request.body;

    const productRepository = getRepository(Products);

    const product = productRepository.create({
      name,
      cost,
      is_active,
    });

    try {
      await productRepository.save(product);
    } catch (error) {
      throw new AppError('Não foi possivel salavar o produto', 400);
    }

    return response.send(product);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { ...rest } = request.body;
    const productsRepository = getRepository(Products);
    const updateResult = await productsRepository.update(id, { ...rest });

    if (!updateResult.affected) {
      throw new AppError('Id Inexistente', 404);
    }

    return response.send(updateResult);
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;
    const productsRepository = getRepository(Products);

    const deleteResult = await productsRepository.delete(id);

    if (!deleteResult.affected) {
      throw new AppError('Id Inexistente', 404);
    }

    return response.send(deleteResult);
  }
}

export default new ProductsController();
