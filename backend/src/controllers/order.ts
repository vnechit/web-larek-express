import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  const records = await Product.find().where('_id').in(body.items).exec();

  if (records.length !== body.items.length) {
    next(new BadRequestError('Отправлены не валидные данные'));
  }

  let checkTotal: number = 0;

  records.forEach((record) => {
    if (!record.price) {
      next(new BadRequestError('Отправлены не валидные данные'));
    }
    checkTotal += record.price === null ? 0 : record.price;
  });

  if (checkTotal === body.total) {
    res.status(201).send({ _id: faker.string.uuid(), total: body.total });
  } else {
    next(new BadRequestError('Отправлены не валидные данные'));
  }
};

export default createOrder;
