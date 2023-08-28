import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { AccountAttrs } from "@testsequencer/common";

it("returns a 401 if user is not signed in", async () => {
    return await request(app)
    .post("/api/accounts/create")
    .send({})
    .expect(401);
});
  
it("returns a 401 if user is signed in but is not a superadmin user role", async () => {
    const cookie = await global.signin(false);

    return await request(app)
    .post("/api/accounts/create")
    .set('Cookie', cookie)
    .send({})
    .expect(401);
});

it("returns a 400 if the account already exists", async () => {
    const cookie = await global.signin(true);

    const accountCount = 1;
    let createdAccount = {};
    for (let i = 0; i < accountCount; i++) {
        const account: AccountAttrs = {
        name: "Test Account "+i,
        products: [new mongoose.Types.ObjectId().toHexString(), new mongoose.Types.ObjectId().toHexString()],
        active: true
        };
        const createResponse = await request(app)
        .post("/api/accounts/create")
        .set('Cookie', cookie)
        .send(account);
        expect(createResponse.statusCode).toBe(201);
        createdAccount = createResponse.body as AccountAttrs;
    }

    const response = await request(app)
    .post("/api/accounts/create")
    .set('Cookie', cookie)
    .send(createdAccount);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Account already exists");
});

it("returns a 201 if the account is valid and doesn't already exists", async () => {
    const cookie = await global.signin(true);

    const account: AccountAttrs = {
        name: "Test Account",
        products: [new mongoose.Types.ObjectId().toHexString(), new mongoose.Types.ObjectId().toHexString()],
        active: true
    };

    const response = await request(app)
    .post("/api/accounts/create")
    .set('Cookie', cookie)
    .send(account);

    const createdAccount = response.body as AccountAttrs;

    expect(response.statusCode).toBe(201);
    expect(createdAccount).toBeDefined();
    expect(createdAccount.name).toBe(account.name);
    expect(createdAccount.products.length).toBe(account.products.length);
    expect(createdAccount.products[0]).toBe(account.products[0]);
    expect(createdAccount.products[1]).toBe(account.products[1]);
    expect(createdAccount.active).toBe(account.active);
});