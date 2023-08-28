import request from 'supertest';
import { app } from '../../app';
import { TestAttrs, UserRole } from '@testsequencer/common';
import mongoose from 'mongoose';

it('returns 400 if id is not valid mongodb objectid', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const response = await request(app)
        .patch('/api/tests/123/edit')
        .set('Cookie', user)
        .send({});

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual("testid is not valid mongodb object id");
});

it('returns 401 if user is technician', async () => {
    const user = await global.signin(UserRole.TECHNICIAN);
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .patch(`/api/tests/${id}/edit`)
      .set('Cookie', user)
      .send()
      .expect(401);
});

it('returns 401 if user is biuser', async () => {
    const user = await global.signin(UserRole.BIUSER);
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .patch(`/api/tests/${id}/edit`)
      .set('Cookie', user)
      .send()
      .expect(401);
});

it('returns 400 if updated tests parentAccountId does not match users account id', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const parentAccountId = global.getAccountId();
    const parentProductId = new mongoose.Types.ObjectId().toHexString();
    const test: TestAttrs = {
        name: 'test',
        description: 'description',
        active: true,
        parentProductId,
        parentAccountId
    };

    const response = await request(app)
        .post('/api/tests/create')
        .set('Cookie', user)
        .send(test)
        .expect(201);

    const testId = response.body.id;
    expect(testId).toBeDefined();
    test.parentAccountId = new mongoose.Types.ObjectId().toHexString();

    const modifyResponse = await request(app)
        .patch(`/api/tests/${testId}/edit`)
        .set('Cookie', user)
        .send(test);

    expect(modifyResponse.statusCode).toEqual(400);
    expect(modifyResponse.body.error).toEqual("parentAccountId does not match user's account id");
});

it('returns 200 if update successful', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const parentAccountId = global.getAccountId();
    const parentProductId = new mongoose.Types.ObjectId().toHexString();
    const test: TestAttrs = {
        name: 'test',
        description: 'description',
        active: true,
        parentProductId,
        parentAccountId
    };

    const response = await request(app)
        .post('/api/tests/create')
        .set('Cookie', user)
        .send(test)
        .expect(201);

    const testId = response.body.id;
    expect(testId).toBeDefined();
    test.description = "A new description";

    const modifyResponse = await request(app)
        .patch(`/api/tests/${testId}/edit`)
        .set('Cookie', user)
        .send(test);

    const modifiedProduct = modifyResponse.body as TestAttrs;

    expect(modifyResponse.statusCode).toEqual(200);
    expect(modifiedProduct.description).toEqual(test.description);
});

it('returns 304 if no updates are made', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const parentAccountId = global.getAccountId();
    const parentProductId = new mongoose.Types.ObjectId().toHexString();
    const test: TestAttrs = {
        name: 'test',
        description: 'description',
        active: true,
        parentProductId,
        parentAccountId
    };

    const response = await request(app)
        .post('/api/tests/create')
        .set('Cookie', user)
        .send(test)
        .expect(201);

    const testId = response.body.id;
    expect(testId).toBeDefined();

    const modifyResponse = await request(app)
        .patch(`/api/tests/${testId}/edit`)
        .set('Cookie', user)
        .send(test);

    expect(modifyResponse.statusCode).toEqual(304);
});