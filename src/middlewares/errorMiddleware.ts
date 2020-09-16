import AppError from 'errors/AppError';
import { NextFunction, Response, Request } from 'express';

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

  return response
    .status(500)
    .json({ status: 'Error', message: 'Erro interno do servidor' });
}
