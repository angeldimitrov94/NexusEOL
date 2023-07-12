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
import { allTestResultsRouter } from './routes/all-test-results';
import { createTestResultRouter } from './routes/create-test-results';
import { modifyTestResultRouter } from './routes/modify-test-result';
import { testResultByIdRouter } from './routes/test-result-by-id';
import { allTestAttemptsRouter } from './routes/all-test-attempts';
import { createTestAttemptRouter } from './routes/create-test-attempt';
import { modifyTestAttemptRouter } from './routes/modify-test-attempt';
import { testAttemptByIdRouter } from './routes/test-attempt-by-id';
import { deleteTestRouter } from './routes/delete-test';

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
app.use(deleteTestRouter);
app.use(allTestResultsRouter);
app.use(createTestResultRouter);
app.use(modifyTestResultRouter);
app.use(testResultByIdRouter);
app.use(allTestAttemptsRouter);
app.use(createTestAttemptRouter);
app.use(modifyTestAttemptRouter);
app.use(testAttemptByIdRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
