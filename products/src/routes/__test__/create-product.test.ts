import request from 'supertest';
import { app } from '../../app';
import { ProductAttrs, ProductState, UserRole } from '@testsequencer/common';

it('returns 401 if not authenticated', async () => {
    await request(app)
      .post('/api/products/create')
      .send()
      .expect(401);
});

it('returns 401 if signed in user is TECHNICIAN', async () => {
    const user = await global.signin(UserRole.TECHNICIAN);
    await request(app)
      .post('/api/products/create')
      .set('Cookie', user)
      .send()
      .expect(401);
});

it('returns 401 if signed in user is BIUSER', async () => {
    const user = await global.signin(UserRole.BIUSER);
    await request(app)
      .post('/api/products/create')
      .set('Cookie', user)
      .send()
      .expect(401);
});

it('returns 400 if parentAccountId does not match users account id', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const productWithWrongParentAccountId: ProductAttrs = {
        name: 'Product A',
        description: 'A product',
        active: true,
        mostRecentTestAttemptId: '',
        state: '',
        tests: [],
        parentAccountId: ''
    };
    const response = await request(app)
        .post('/api/products/create')
        .set('Cookie', user)
        .send(productWithWrongParentAccountId);

    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual("parentAccountId does not match user's account id");
});

it('returns 201 if product is successfully created', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const product: ProductAttrs = {
        name: 'Product A',
        description: 'A product',
        active: true,
        state: ProductState.NOT_STARTED,
        tests: [],
        parentAccountId: global.getAccountId()
    };

    await request(app)
        .post('/api/products/create')
        .set('Cookie', user)
        .send(product)
        .expect(201);
});

it('returns 400 if product already exists and is attempted to be re-created', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const product: ProductAttrs = {
        name: 'Product A',
        description: 'A product',
        active: true,
        state: ProductState.NOT_STARTED,
        tests: [],
        parentAccountId: global.getAccountId()
    };

    await request(app)
        .post('/api/products/create')
        .set('Cookie', user)
        .send(product)
        .expect(201);

    const response = await request(app)
        .post('/api/products/create')
        .set('Cookie', user)
        .send(product);

    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual("Product already exists");
});