import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { allUsersRouter } from './routes/all-users';
import { createUserRouter } from './routes/create-user';
import { modifyUserRouter } from './routes/modify-user';
import { userByIdRouter } from './routes/user-by-id';
import { NotFoundError } from '@testsequencer/common';
import { errorHandler } from '@testsequencer/common-backend/build/middlewares/error-handler';
import { deleteUserRouter } from './routes/delete-user';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(allUsersRouter);
app.use(createUserRouter);
app.use(modifyUserRouter);
app.use(userByIdRouter);
app.use(deleteUserRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
