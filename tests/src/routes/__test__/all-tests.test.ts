import request from 'supertest';
import { app } from '../../app';
import { ProductAttrs, ProductState, TestAttrs, UserRole } from '@testsequencer/common';
import mongoose from 'mongoose';

it('returns 401 if user is not signed in', async () => {
    await request(app)
        .get(`/api/tests`)
        .send()
        .expect(401);
});

it('returns 200 and correct results if tests are defined and user is technician', async () => {
    const adminUser = await global.signin(UserRole.ADMIN);

    const parentProductId = new mongoose.Types.ObjectId().toHexString();
    const test1: TestAttrs = {
        name: 'Test 1',
        description: 'A test',
        active: true,
        parentProductId: parentProductId,
        parentAccountId: global.getAccountId()
    };

    const test2: TestAttrs = {
        name: 'Test 2',
        description: 'A second test',
        active: true,
        parentProductId: parentProductId,
        parentAccountId: global.getAccountId()
    };

    await request(app)
        .post('/api/tests/create')
        .set('Cookie', adminUser)
        .send(test1)
        .expect(201);

    await request(app)
        .post('/api/tests/create')
        .set('Cookie', adminUser)
        .send(test2)
        .expect(201);

    const technicianUser = await global.signin(UserRole.TECHNICIAN);

    const result = await request(app)
        .get(`/api/tests`)
        .set('Cookie', technicianUser)
        .send();

    const tests = result.body;
    expect(result.status).toEqual(200);
    Array.isArray(tests);
    expect(tests.length).toEqual(2);
});

it("returns a 200 with an empty array if no tests are defined", async () => {
    const cookie = await global.signin(UserRole.BIUSER);

    const response = await request(app)
        .get("/api/tests")
        .set('Cookie', cookie);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
});

it("returns a 200 with valid data if tests are found", async () => {
    const cookie = await global.signin(UserRole.ADMIN);
    const parentAccountId = global.getAccountId();
    const parentProductId = new mongoose.Types.ObjectId().toHexString();

    const test1: TestAttrs = {
        name: 'test 1',
        description: 'description 1',
        active: true,
        parentProductId: parentProductId,
        parentAccountId: parentAccountId
    };
    const createResponse1 = await request(app)
        .post("/api/tests/create")
        .set('Cookie', cookie)
        .send(test1);
    expect(createResponse1.statusCode).toBe(201);
    const test2: TestAttrs = {
        name: 'test 2',
        description: 'description 2',
        active: true,
        parentProductId: parentProductId,
        parentAccountId: parentAccountId
    };
    const createResponse2 = await request(app)
        .post("/api/tests/create")
        .set('Cookie', cookie)
        .send(test2);
    expect(createResponse2.statusCode).toBe(201);

    const createdTest1: TestAttrs = createResponse1.body as TestAttrs;

    const createdTest2: TestAttrs = createResponse2.body as TestAttrs;

    const response = await request(app)
        .get("/api/tests")
        .set('Cookie', cookie);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toEqual(2);
    const responseTests: TestAttrs[] = [];
    response.body.map((item: TestAttrs) => {
        if (item)
            responseTests.push(item);
    });

    console.log(responseTests);

    const responseTest1: TestAttrs | undefined = responseTests.find(item => item.id === createdTest1.id);
    expect(responseTest1).toBeDefined();
    expect(responseTest1?.active).toEqual(createdTest1.active);
    expect(responseTest1?.id).toEqual(createdTest1.id);
    expect(responseTest1?.name).toEqual(createdTest1.name);
    expect(responseTest1?.description).toEqual(createdTest1.description);
    expect(responseTest1?.parentAccountId).toEqual(createdTest1.parentAccountId);
    expect(responseTest1?.parentProductId).toEqual(createdTest1.parentProductId);

    const responseTest2: TestAttrs | undefined = responseTests.find(item => item.id === createdTest2.id);
    expect(responseTest2).toBeDefined();
    expect(responseTest2?.active).toEqual(createdTest2.active);
    expect(responseTest2?.id).toEqual(createdTest2.id);
    expect(responseTest2?.name).toEqual(createdTest2.name);
    expect(responseTest2?.description).toEqual(createdTest2.description);
    expect(responseTest2?.parentAccountId).toEqual(createdTest2.parentAccountId);
    expect(responseTest2?.parentProductId).toEqual(createdTest2.parentProductId);
});

it("returns a 200 with valid data if test are found and that adheres to the page and limit parameters", async () => {
    const cookie = await global.signin(UserRole.ADMIN);
    const parentAccountId = global.getAccountId();
    const parentProductId = new mongoose.Types.ObjectId().toHexString();

    type TestDictionary = { [key: string]: TestAttrs };
    const createdTests: TestDictionary = {};
    const testCount = 57;
    for (let i = 0; i < testCount; i++) {
        const test: TestAttrs = {
            name: `test ${i}`,
            description: `description ${i}`,
            active: true,
            parentProductId: parentProductId,
            parentAccountId: parentAccountId
        };
        const createResponse = await request(app)
            .post("/api/tests/create")
            .set('Cookie', cookie)
            .send(test);
        expect(createResponse.statusCode).toBe(201);
        const createdAccount: TestAttrs = createResponse.body as TestAttrs;
        if (createdAccount && createdAccount.id) {
            createdTests[createdAccount.id] = createdAccount;
        }
    }

    const page = 1;
    const limit = 5;
    const response = await request(app)
        .get(`/api/tests?page=${page}&limit=${limit}`)
        .set('Cookie', cookie);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toEqual(limit);
    response.body.forEach((retrievedTest: TestAttrs) => {
        if (retrievedTest && retrievedTest.id) {
            expect(retrievedTest.active).toEqual(createdTests[retrievedTest.id].active);
            expect(retrievedTest.name).toEqual(createdTests[retrievedTest.id].name);
            expect(retrievedTest.description).toEqual(createdTests[retrievedTest.id].description);
            expect(retrievedTest.parentAccountId).toEqual(createdTests[retrievedTest.id].parentAccountId);
            expect(retrievedTest.parentProductId).toEqual(createdTests[retrievedTest.id].parentProductId);
        }
    });
});