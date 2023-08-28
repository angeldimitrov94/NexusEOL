import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
  const cookie = await global.signin(false);

  const response = await request(app)
    .get('/api/auth/currentuser')
    .set('Cookie', cookie);

  expect(response.statusCode).toEqual(200);
  expect(response.body.currentUser.email).toEqual('test@email.com');
});

it('responds with 401 if not authenticated', async () => {
  const response = await request(app)
    .get('/api/auth/currentuser');

  expect(response.statusCode).toEqual(401);
});
