import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/product';
import ServerError from '../errors/server-error';
import BadRequestError from '../errors/bad-request-error';
import DuplicateError from '../errors/duplicate-error';

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const {
    title, price, description, category, image,
  } = req.body;

  Product.create({
    title,
    price,
    description,
    category,
    image,
  })
    .then((product) => res.status(201).send(product))
    .catch((error) => {
      if (error instanceof MongooseError.ValidationError) {
        return next(new BadRequestError(error.message));
      }
      if (error instanceof Error && error.message.includes('E11000')) {
        return next(new DuplicateError('Запись с таким "title" уже существует'));
      }
      return next(new ServerError('Internal server error'));
    });
};

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  Product.find()
    .then((products) => res.status(200).send({ items: products, total: products.length }))
    .catch((error) => next(new ServerError('Internal server error')));
};
