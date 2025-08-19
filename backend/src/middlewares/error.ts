import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../errors/bad-request-error';
import DuplicateError from '../errors/duplicate-error';
import NotFoundError from '../errors/not-found-error';
import ServerError from '../errors/server-error';

export default (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (isCelebrateError(error)) {
    res.status(400).send({ message: 'Validation failed' });
  } else if (
    error instanceof BadRequestError
      || error instanceof DuplicateError
      || error instanceof NotFoundError
      || error instanceof ServerError
  ) {
    const code = error.statusCode || 500;
    const message = error.message || 'Internal server error';
    res.status(code).send({ message });
  } else {
    res.status(500).send({ message: 'Internal server error' });
  }
};
