import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import validateOrder from './middlewares/validateOrder';
import errorSender from './middlewares/error';
import { requestLogger, errorLogger } from './middlewares/logger';

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
app.use('/order', validateOrder, orderRouter);

app.use(errorLogger);
app.use(errorSender);

app.listen(PORT, () => {
  console.log('server is running port: ', PORT);
});
