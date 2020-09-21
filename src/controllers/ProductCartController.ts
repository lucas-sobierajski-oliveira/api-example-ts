import * as Yup from 'yup';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import ShoppingCart from '../entities/ShoppingCart';
import ShoppingCartProducts from '../entities/ShoppingCartProducts';

interface IShoppingCartProducts {
  idProduct: number;
  shoppingCartId: string;
  amount: number;
}

class ProductCartController {
  async store(request: Request, response: Response) {
    const schema = Yup.object().shape({
      idProduct: Yup.number().required(),
    });

    if (!(await schema.isValid(request.body))) {
      throw new AppError('Erro na validação', 400);
    }

    const { idUser } = request;
    const { idProduct, amount = 1 } = request.body;
    const shoppingCartRepository = getRepository(ShoppingCart);

    const userShoppingCart = await shoppingCartRepository.findOne({
      where: { userId: idUser },
    });

    if (!userShoppingCart) {
      throw new AppError('Carrinho inexistente', 404);
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
          amount,
          products: { id: idProduct },
          shoppingCart: { id: userShoppingCart.id },
        },
      );

      await shoppingCartProductsRepository.save(
        productShoppingCartCreate as IShoppingCartProducts,
      );
    } else {
      productInCart.amount = Number(productInCart.amount) + amount;
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
