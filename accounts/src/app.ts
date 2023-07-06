import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { allAccountsRouter } from './routes/all-accounts';
import { createAccountRouter } from './routes/create-account';
import { modifyAccountRouter } from './routes/modify-account';
import { accountByIdRouter } from './routes/account-by-id';
import { NotFoundError } from '@testsequencer/common';
import { errorHandler } from '@testsequencer/common-backend/build/middlewares/error-handler';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(allAccountsRouter);
app.use(createAccountRouter);
app.use(modifyAccountRouter);
app.use(accountByIdRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
