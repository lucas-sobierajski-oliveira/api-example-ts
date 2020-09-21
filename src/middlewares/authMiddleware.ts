import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import tokenConfig from '../config/tokenConfig';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  idUser: string;
}

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token inexistente', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, tokenConfig.secret);
    const { idUser } = decoded as ITokenPayload;
    request.idUser = idUser;

    return next();
  } catch (error) {
    throw new AppError('token inválido', 401);
  }
}
