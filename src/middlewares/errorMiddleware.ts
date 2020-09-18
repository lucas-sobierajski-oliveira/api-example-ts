import { NextFunction, Response, Request } from 'express';

import AppError from '../errors/AppError';

export default function errorMiddleware(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: err.statusCode, message: err.message });
  }

  console.error(err);

  return response
    .status(500)
    .json({ status: 'Error', message: 'Erro interno do servidor' });
}
