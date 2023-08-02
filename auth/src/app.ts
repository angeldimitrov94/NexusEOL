import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { NotFoundError } from '@testsequencer/common';
import { errorHandler } from '@testsequencer/common-backend/build/middlewares/error-handler';
import { signedInRouter } from './routes/is-signed-in';
import { resetPasswordRouter } from './routes/reset-password';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(signedInRouter);
app.use(resetPasswordRouter);

app.all('*', async (req, res) => {
  console.error(`no route found for : ${req.url}`);
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
