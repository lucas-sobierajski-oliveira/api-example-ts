import * as Yup from 'yup';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ShoppingCart from '../entities/ShoppingCart';
import ShoppingCartProducts from '../entities/ShoppingCartProducts';
import RequestEntity from '../entities/Requests';

import AppError from '../errors/AppError';

class RequestController {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const requestObject = await getRepository(RequestEntity).findOne({ id });

    if (!requestObject) {
      throw new AppError('Não existe pedido com esse id', 404);
    }

    const itemList = JSON.parse(requestObject.itemsList);
    const newList = itemList.map((item: any) => item.name);

    return response.send({
      id: requestObject.id,
      createdAt: requestObject.createdAt,
      status: requestObject.status,
      total: requestObject.total,
      itemsList: newList,
    });
  }

  async index(request: Request, response: Response) {
    const allRequests = await getRepository(RequestEntity).find({
      order: {
        createdAt: 'ASC',
      },
    });

    if (allRequests.length < 1) {
      throw new AppError('Não existem registros', 404);
    }

    return response.send(allRequests);
  }

  async store(request: Request, response: Response) {
    const schema = Yup.object().shape({
      shoppingCartId: Yup.string().required(),
      addressDelivery: Yup.string().required(),
      isCreditCard: Yup.boolean().required(),
      status: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      throw new AppError('Erro de validação', 400);
    }

    const {
      shoppingCartId,
      addressDelivery,
      isCreditCard,
      status,
    } = request.body;

    const shoppingCartRepository = getRepository(ShoppingCart);
    const userShoppingCart: any = await shoppingCartRepository.find({
      where: { id: shoppingCartId },
    });

    if (!userShoppingCart) {
      throw new AppError('Carrinho inexistente', 404);
    }

    // criar inserção em Request, em seguida remover todos os produtos do carrinho referente aquele id
    const allUserProducts = await getRepository(ShoppingCartProducts).find({
      where: { shoppingCart: { id: shoppingCartId } },
    });

    if (allUserProducts.length < 1) {
      throw new AppError('Não existem compras nesse carrinho', 401);
    }

    let total = 0;

    const allProducts = allUserProducts.map((infoProduct: any) => {
      total += infoProduct.products.cost;

      return {
        idProduct: infoProduct.id,
        name: infoProduct.products.name,
        cost: infoProduct.products.cost,
        amount: infoProduct.amount,
      };
    });

    if (total < 10) {
      throw new AppError(
        'Não é possivel fazer um pedido com o valor menor que 10 reais',
        400,
      );
    }

    const requestObject = await getRepository(RequestEntity).save({
      itemsList: JSON.stringify(allProducts),
      addressDelivery,
      isCreditCard,
      status,
      total,
    });

    allUserProducts.forEach(userProduct =>
      getRepository(ShoppingCartProducts).remove(userProduct),
    );

    return response.send(requestObject);
  }

  async update(request: Request, response: Response) {
    const schema = Yup.object().shape({
      status: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      throw new AppError('Erro de validação', 400);
    }

    const { id } = request.params;
    const { status } = request.body;

    const requestObject = await getRepository(RequestEntity).findOne({ id });

    if (!requestObject) {
      throw new AppError('Não existe registro com esse ID');
    }

    requestObject.status = status;

    await getRepository(RequestEntity).update({ id }, requestObject);

    return response.send(requestObject);
  }
}

export default new RequestController();
