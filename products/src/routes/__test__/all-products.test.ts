import request from 'supertest';
import { app } from '../../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Product } from '@testsequencer/common-backend';
import { ProductAttrs, ProductState } from '@testsequencer/common';

const product = {
  name: 'A',
  description: 'A',
  active: true,
  mostRecentTestAttemptId: '1',
  state: ProductState.NOT_STARTED,
  tests: [],
  parentAccountId: '5000'
} as ProductAttrs;

it('returns empty array if not authenticated', async () => {
  const response = await request(app)
    .get('products')
    .send()
    .expect(404);
  
  expect(response.body).toEqual(null);
}, 2000);

it('returns empty array if products with account id of user DO NOT exist', async () => {
  const createdProduct = Product.build(product);
  await createdProduct.save();

  const jwtSession = await signin();

  const response = await request(app)
    .get('products')
    .set('Cookie', jwtSession)
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
}, 2000);

it('returns correct array of products if products with account id of user DO exist', async () => {
  const createdProduct = Product.build(product);
  await createdProduct.save();

  const jwtSession = await signin();

  const response = await request(app)
    .get('products')
    .set('Cookie', jwtSession)
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(createdProduct.toJSON());
}, 2000);