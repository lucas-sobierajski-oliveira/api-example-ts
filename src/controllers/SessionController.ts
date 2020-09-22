import * as Yup from 'yup';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import Users from '../entities/Users';
import AppError from '../errors/AppError';
import tokenConfig from '../config/tokenConfig';

class SessionController {
  async store(request: Request, response: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      throw new AppError('Parâmetros inválidos', 400);
    }

    const { name, password } = request.body;

    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne({ name, password });

    if (!user) {
      throw new AppError('Usuário/Password inválidos', 401);
    }

    return response.status(200).json({
      token: sign({ idUser: user.id }, tokenConfig.secret, {
        expiresIn: tokenConfig.expires,
      }),
    });
  }
}

export default new SessionController();
