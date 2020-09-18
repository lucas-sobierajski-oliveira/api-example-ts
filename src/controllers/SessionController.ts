import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import Users from '../entities/Users';
import AppError from '../errors/AppError';
import tokenConfig from '../config/tokenConfig';

class SessionController {
  async store(request: Request, response: Response) {
    const { name, password } = request.body;

    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne({ name, password });

    if (!user) {
      throw new AppError('Usuário/Password inválidos');
    }

    return response.json({
      token: sign({ id_user: user.id }, tokenConfig.secret, {
        expiresIn: tokenConfig.expires,
      }),
    });
  }
}

export default new SessionController();
