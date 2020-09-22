import * as Yup from 'yup';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import ShoppingCart from '../entities/ShoppingCart';
import ShoppingCartProducts from '../entities/ShoppingCartProducts';
import Products from '../entities/Products';

interface IShoppingCartProducts {
  idProduct: number;
  shoppingCartId: string;
  amount: number;
}

class ProductCartController {
  async store(request: Request, response: Response) {
    const schema = Yup.object().shape({
      idProduct: Yup.number().required(),
      amount: Yup.number().required(),
    });

    if (!(await schema.isValid(request.body))) {
      throw new AppError('Erro na validação', 400);
    }

    const { idUser } = request;
    const { idProduct, amount } = request.body;

    const shoppingCartRepository = getRepository(ShoppingCart);

    const userShoppingCart = await shoppingCartRepository.findOne({
      where: { userId: idUser },
    });

    if (!userShoppingCart) {
      throw new AppError('Carrinho inexistente', 404);
    }

    const productExists = await getRepository(Products).findOne({
      id: idProduct,
    });

    if (!productExists) {
      throw new AppError('Produto inexistente', 404);
    }

    const shoppingCartProductsRepository = getRepository(ShoppingCartProducts);

    const productInCart: any = await shoppingCartProductsRepository.findOne({
      where: {
        products: { id: idProduct },
        shoppingCart: { id: userShoppingCart.id },
      },
    });

    if (!productInCart) {
      const productShoppingCartCreate: any = shoppingCartProductsRepository.create(
        {
          amount: !!amount === false ? 1 : amount,
          products: { id: idProduct },
          shoppingCart: { id: userShoppingCart.id },
        },
      );

      await shoppingCartProductsRepository.save(
        productShoppingCartCreate as IShoppingCartProducts,
      );
    } else {
      productInCart.amount += amount;
      shoppingCartProductsRepository.update(
        {
          products: { id: idProduct },
          shoppingCart: { id: userShoppingCart.id },
        },
        productInCart,
      );
    }

    return response.send(userShoppingCart.id);
  }
}

export default new ProductCartController();
