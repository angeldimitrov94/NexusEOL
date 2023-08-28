import request from 'supertest';
import { app } from '../../app';
import { ProductAttrs, ProductState, UserRole } from '@testsequencer/common';
import mongoose from 'mongoose';

it('returns 400 if id is not valid mongodb objectid', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const response = await request(app)
        .get('/api/products/123')
        .set('Cookie', user)
        .send();

    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual("Invalid product id");
});

it('returns 404 if product with id is not found', async () => {
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

    const nonExistantId = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get(`/api/products/${nonExistantId}`)
        .set('Cookie', user)
        .send(product)
        .expect(404);
});

it('returns 200 and correct results if valid object id is passed in', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const product: ProductAttrs = {
        name: 'Product A',
        description: 'A product',
        active: true,
        state: ProductState.NOT_STARTED,
        tests: [],
        parentAccountId: global.getAccountId()
    };

    const createResponse = await request(app)
        .post('/api/products/create')
        .set('Cookie', user)
        .send(product)
        .expect(201);

    const productAttrs = createResponse.body as ProductAttrs;
    const productId = productAttrs.id;
    expect(productId).toBeDefined();

    const getExisting = await request(app)
        .get(`/api/products/${productAttrs.id}`)
        .set('Cookie', user)
        .send(product);

    expect(getExisting.status).toEqual(200);
    expect(getExisting.body).toEqual(productAttrs);
});