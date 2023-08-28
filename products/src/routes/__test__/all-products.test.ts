import request from 'supertest';
import { app } from '../../app';
import { Product } from '@testsequencer/common-backend';
import { ProductAttrs, ProductState, UserRole } from '@testsequencer/common';

it('returns 404 if not authenticated', async () => {
  await request(app)
    .get('/api/products')
    .send()
    .expect(401);
});

it('returns empty array if products with account id of user DO NOT exist', async () => {
  let cookie = await global.signin(UserRole.ADMIN);

  const product = {
    name: 'A',
    description: 'A',
    active: true,
    mostRecentTestAttemptId: '1',
    state: ProductState.NOT_STARTED,
    tests: [],
    parentAccountId: global.getAccountId()
  } as ProductAttrs;

  const createResponse = await request(app)
    .post('/api/products/create')
    .set('Cookie', cookie)
    .send(product)
    .expect(201);
  console.log("createResponse.body: ", createResponse.body);

  global.newRandomAccountId();
  cookie = await global.signin(UserRole.ADMIN);

  const response = await request(app)
    .get('/api/products')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});

it('returns correct array of products if products with account id of user DO exist', async () => {
  let cookie = await global.signin(UserRole.ADMIN);

  const product = {
    name: 'A',
    description: 'A',
    active: true,
    mostRecentTestAttemptId: '1',
    state: ProductState.NOT_STARTED,
    tests: [],
    parentAccountId: global.getAccountId()
  } as ProductAttrs;

  const createResponse = await request(app)
    .post('/api/products/create')
    .set('Cookie', cookie)
    .send(product)
    .expect(201);
  console.log("createResponse.body: ", createResponse.body);

  const response = await request(app)
    .get('/api/products')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  const productAttr = response.body as ProductAttrs[];
  expect(productAttr.length).toEqual(1);
  expect(productAttr[0].name).toEqual(product.name);
  expect(productAttr[0].description).toEqual(product.description);
  expect(productAttr[0].active).toEqual(product.active);
  expect(productAttr[0].mostRecentTestAttemptId).toEqual(product.mostRecentTestAttemptId);
  expect(productAttr[0].state).toEqual(product.state);
  expect(productAttr[0].tests).toEqual(product.tests);
});

it("returns a 200 with valid data if products are found and that adheres to the page and limit parameters", async () => {
  const cookie = await global.signin(UserRole.ADMIN);

  type ProductDictionary = { [key: string]: ProductAttrs };
  const createdProducts: ProductDictionary = {};
  const accountCount = 57;
  for (let i = 0; i < accountCount; i++) {
    const product: ProductAttrs = {
      name: `A${i}`,
      description: 'A${i}',
      active: true,
      mostRecentTestAttemptId: '1',
      state: ProductState.NOT_STARTED,
      tests: [],
      parentAccountId: global.getAccountId()
    };
    const createResponse = await request(app)
      .post("/api/products/create")
      .set('Cookie', cookie)
      .send(product);
    expect(createResponse.statusCode).toBe(201);
    const createdProduct: ProductAttrs = createResponse.body as ProductAttrs;
    if(createdProduct && createdProduct.id){
      createdProducts[createdProduct.id] = createdProduct;
    }
  } 

  const page = 1;
  const limit = 5;
  const response = await request(app)
    .get(`/api/products?page=${page}&limit=${limit}`)
    .set('Cookie', cookie);

  expect(response.statusCode).toBe(200);
  expect(response.body.length).toEqual(limit);
  response.body.forEach((retrievedProduct: ProductAttrs) => {
    if(retrievedProduct && retrievedProduct.id){
      expect(retrievedProduct.name).toEqual(createdProducts[retrievedProduct.id].name);
      expect(retrievedProduct.description).toEqual(createdProducts[retrievedProduct.id].description);
      expect(retrievedProduct.active).toEqual(createdProducts[retrievedProduct.id].active);
      expect(retrievedProduct.mostRecentTestAttemptId).toEqual(createdProducts[retrievedProduct.id].mostRecentTestAttemptId);
      expect(retrievedProduct.state).toEqual(createdProducts[retrievedProduct.id].state);
      expect(retrievedProduct.tests).toEqual(createdProducts[retrievedProduct.id].tests);
    }
  });
});