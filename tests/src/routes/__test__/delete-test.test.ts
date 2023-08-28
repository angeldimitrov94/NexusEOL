import request from 'supertest';
import { app } from '../../app';
import { TestAttrs, TestState, UserRole } from '@testsequencer/common';
import mongoose from 'mongoose';

it('returns 400 if id is not valid mongodb objectid', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const response = await request(app)
        .delete('/api/tests/123/delete')
        .set('Cookie', user)
        .send({});

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual("testid is not valid mongodb object id");
});

it('returns 401 if user is technician', async () => {
    const user = await global.signin(UserRole.TECHNICIAN);
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .delete(`/api/tests/${id}/delete`)
      .set('Cookie', user)
      .send()
      .expect(401);
});

it('returns 401 if user is biuser', async () => {
    const user = await global.signin(UserRole.BIUSER);
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .delete(`/api/tests/${id}/delete`)
      .set('Cookie', user)
      .send()
      .expect(401);
});

it('returns 204 if test is successfully deleted', async () => {
    const user = await global.signin(UserRole.ADMIN);
    const parentAccountId = global.getAccountId();
    const parentProductId = new mongoose.Types.ObjectId().toHexString();
    const test: TestAttrs = {
        name: 'Test',
        description: 'description',
        active: true,
        parentProductId: parentProductId,
        parentAccountId: parentAccountId
    };

    const result = await request(app)
        .post('/api/tests/create')
        .set('Cookie', user)
        .send(test)
        .expect(201);

    const id = result.body.id;

    await request(app)
        .delete(`/api/tests/${id}/delete`)
        .set('Cookie', user)
        .expect(204);
});

it('returns 404 if test does not exist', async () => {
    const user = await global.signin(UserRole.ADMIN);

    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .delete(`/api/tests/${id}/delete`)
        .set('Cookie', user)
        .expect(404);
});