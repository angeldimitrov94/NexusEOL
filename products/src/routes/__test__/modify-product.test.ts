import request from 'supertest';
import { app } from '../../app';
import { ProductAttrs, ProductState, UserRole } from '@testsequencer/common';
import mongoose from 'mongoose';

it('returns 400 if id is not valid mongodb objectid', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const response = await request(app)
        .patch('/api/products/123/edit')
        .set('Cookie', user)
        .send({});

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual("productid is not valid mongodb object id");
});

it('returns 401 if user is technician', async () => {
    const user = await global.signin(UserRole.TECHNICIAN);
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .patch(`/api/products/${id}/edit`)
      .set('Cookie', user)
      .send()
      .expect(401);
});

it('returns 401 if user is biuser', async () => {
    const user = await global.signin(UserRole.BIUSER);
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .patch(`/api/products/${id}/edit`)
      .set('Cookie', user)
      .send()
      .expect(401);
});

it('returns 400 if updated product account id does not match users account id', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const product: ProductAttrs = {
        name: 'Product A',
        description: 'A product',
        active: true,
        state: ProductState.NOT_STARTED,
        tests: [],
        parentAccountId: global.getAccountId()
    };

    const response = await request(app)
        .post('/api/products/create')
        .set('Cookie', user)
        .send(product)
        .expect(201);

    const productId = response.body.id;
    expect(productId).toBeDefined();
    product.parentAccountId = new mongoose.Types.ObjectId().toHexString();

    const modifyResponse = await request(app)
        .patch(`/api/products/${productId}/edit`)
        .set('Cookie', user)
        .send(product);

    expect(modifyResponse.statusCode).toEqual(400);
    expect(modifyResponse.body.error).toEqual("parentAccountId does not match user's account id");
});

it('returns 200 if update successful', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const product: ProductAttrs = {
        name: 'Product A',
        description: 'A product',
        active: true,
        state: ProductState.NOT_STARTED,
        tests: [],
        parentAccountId: global.getAccountId()
    };

    const response = await request(app)
        .post('/api/products/create')
        .set('Cookie', user)
        .send(product)
        .expect(201);

    const productId = response.body.id;
    expect(productId).toBeDefined();
    product.description = "A new description";

    const modifyResponse = await request(app)
        .patch(`/api/products/${productId}/edit`)
        .set('Cookie', user)
        .send(product);

    const modifiedProduct = modifyResponse.body as ProductAttrs;

    expect(modifyResponse.statusCode).toEqual(200);
    expect(modifiedProduct.description).toEqual(product.description);
});

it('returns 304 if no updates are made', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const product: ProductAttrs = {
        name: 'Product A',
        description: 'A product',
        active: true,
        state: ProductState.NOT_STARTED,
        tests: [],
        parentAccountId: global.getAccountId()
    };

    const response = await request(app)
        .post('/api/products/create')
        .set('Cookie', user)
        .send(product)
        .expect(201);

    const productId = response.body.id;
    expect(productId).toBeDefined();

    const modifyResponse = await request(app)
        .patch(`/api/products/${productId}/edit`)
        .set('Cookie', user)
        .send(product);

    expect(modifyResponse.statusCode).toEqual(304);
});