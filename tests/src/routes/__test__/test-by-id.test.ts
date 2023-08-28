import request from 'supertest';
import { app } from '../../app';
import { TestAttrs, UserRole } from '@testsequencer/common';
import mongoose from 'mongoose';

it('returns 400 if id is not valid mongodb objectid', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const response = await request(app)
        .get('/api/tests/123')
        .set('Cookie', user)
        .send();

    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual("Invalid test id");
});

it('returns 404 if test with id is not found', async () => {
    const user = await global.signin(UserRole.ADMIN);

    await request(app)
        .get(`/api/tests/${new mongoose.Types.ObjectId().toHexString()}`)
        .set('Cookie', user)
        .expect(404);
});

it('returns 200 and correct results if valid object id is passed in', async () => {
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

    const createResponse = await request(app)
        .post('/api/tests/create')
        .set('Cookie', user)
        .send(test)
        .expect(201);

    const testAttrs = createResponse.body as TestAttrs;
    const testId = testAttrs.id;
    expect(testId).toBeDefined();

    const getExisting = await request(app)
        .get(`/api/tests/${testAttrs.id}`)
        .set('Cookie', user)
        .send(test);

    expect(getExisting.status).toEqual(200);
    expect(getExisting.body).toEqual(testAttrs);

    await request(app)
        .delete(`/api/tests/${testAttrs.id}/delete`)
        .set('Cookie', user)
        .send()
        .expect(204);

    const getAfterDelete = await request(app)
        .get(`/api/tests/${testAttrs.id}`)
        .set('Cookie', user)
        .send(test);

    expect(getAfterDelete.status).toEqual(404);
});