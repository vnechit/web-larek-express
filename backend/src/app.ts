import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import errorSender from './middlewares/error';
import { requestLogger, errorLogger } from './middlewares/logger';
import NotFoundError from './errors/not-found-error';

config();

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek' } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(DB_ADDRESS);

app.use(requestLogger);

app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('*', (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError('404 Not Found'));
});

app.use(errorLogger);
app.use(errorSender);

app.listen(PORT, () => {
  console.log('server is running port: ', PORT);
});
