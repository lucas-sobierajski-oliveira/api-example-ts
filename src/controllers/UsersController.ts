import * as Yup from 'yup';
import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Users from '../entities/Users';
import ShoppingCart from '../entities/ShoppingCart';

class UsersController {
  async store(request: Request, response: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      throw new AppError('Erro de validação', 400);
    }
    const { name, password } = request.body;

    const usersRepository = getRepository(Users);
    const user = usersRepository.create({
      name,
      password,
    });

    try {
      await usersRepository.save(user);
    } catch (error) {
      throw new AppError('Não foi possivel salvar o Usuário', 400);
    }

    const shoppingCartRepository = getRepository(ShoppingCart);
    const shoppingCart = shoppingCartRepository.create({
      userId: user.id,
    });

    try {
      await shoppingCartRepository.save(shoppingCart);
    } catch (error) {
      throw new AppError('Não Foi possive');
    }

    return response.send([user, shoppingCart]);
  }
}

export default new UsersController();
