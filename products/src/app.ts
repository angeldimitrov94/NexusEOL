import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { allProductsRouter } from './routes/all-products';
import { createProductRouter } from './routes/create-product';
import { modifyProductRouter } from './routes/modify-product';
import { productByIdRouter } from './routes/product-by-id';
import { NotFoundError } from '@testsequencer/common';
import { errorHandler } from '@testsequencer/common-backend/build/middlewares/error-handler';
import { deleteProductRouter } from './routes/delete-product';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(allProductsRouter);
app.use(createProductRouter);
app.use(modifyProductRouter);
app.use(productByIdRouter);
app.use(deleteProductRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
