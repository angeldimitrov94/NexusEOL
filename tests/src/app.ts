import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { allTestsRouter } from './routes/all-tests';
import { createTestRouter } from './routes/create-test';
import { modifyTestRouter } from './routes/modify-test';
import { testByIdRouter } from './routes/test-by-id';
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

app.use(allTestsRouter);
app.use(createTestRouter);
app.use(modifyTestRouter);
app.use(testByIdRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
