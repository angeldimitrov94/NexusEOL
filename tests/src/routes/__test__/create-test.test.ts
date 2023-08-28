import request from 'supertest';
import { app } from '../../app';
import { TestAttrs, UserRole } from '@testsequencer/common';
import mongoose from 'mongoose';

it('returns 401 if not authenticated', async () => {
    await request(app)
      .post('/api/tests/create')
      .send()
      .expect(401);
});

it('returns 401 if signed in user is TECHNICIAN', async () => {
    const user = await global.signin(UserRole.TECHNICIAN);
    await request(app)
      .post('/api/tests/create')
      .set('Cookie', user)
      .send()
      .expect(401);
});

it('returns 401 if signed in user is BIUSER', async () => {
    const user = await global.signin(UserRole.BIUSER);
    await request(app)
      .post('/api/tests/create')
      .set('Cookie', user)
      .send()
      .expect(401);
});

it('returns 400 if parentAccountId does not match users account id', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const parentAccountId = global.getAccountId();
    const parentProductId = new mongoose.Types.ObjectId().toHexString();
    const testWithWrongParentAccountId: TestAttrs = {
        name: 'Test 1',
        description: 'description 1',
        active: true,
        parentProductId: parentProductId,
        parentAccountId: new mongoose.Types.ObjectId().toHexString()
    };
    const response = await request(app)
        .post('/api/tests/create')
        .set('Cookie', user)
        .send(testWithWrongParentAccountId);

    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual("parentAccountId does not match user's account id");
});

it('returns 201 if test is successfully created', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const parentAccountId = global.getAccountId();
    const parentProductId = new mongoose.Types.ObjectId().toHexString();
    const test: TestAttrs = {
        name: 'Test 1',
        description: 'description 1',
        active: true,
        parentProductId: parentProductId,
        parentAccountId: parentAccountId
    };

    await request(app)
        .post('/api/tests/create')
        .set('Cookie', user)
        .send(test)
        .expect(201);
});

it('returns 400 if test already exists and is attempted to be re-created', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const parentAccountId = global.getAccountId();
    const parentProductId = new mongoose.Types.ObjectId().toHexString();
    const test: TestAttrs = {
        name: 'Test 1',
        description: 'description 1',
        active: true,
        parentProductId: parentProductId,
        parentAccountId: parentAccountId
    };

    await request(app)
        .post('/api/tests/create')
        .set('Cookie', user)
        .send(test)
        .expect(201);

    const response = await request(app)
        .post('/api/tests/create')
        .set('Cookie', user)
        .send(test);

    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual("Test already exists");
});