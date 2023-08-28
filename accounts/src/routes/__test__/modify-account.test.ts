import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { AccountAttrs } from "@testsequencer/common";

it("returns a 401 if user is not signed in", async () => {
    return await request(app)
    .patch("/api/accounts/123/edit")
    .send({})
    .expect(401);
});
  
it("returns a 401 if user is signed in but is not a superadmin user role", async () => {
    const cookie = await global.signin(false);

    return await request(app)
    .patch("/api/accounts/123/edit")
    .set('Cookie', cookie)
    .send({})
    .expect(401);
});

it("returns a 404 if the account doesn't exist", async () => {
    const cookie = await global.signin(true);

    const account: AccountAttrs = {
        name: "Test Account",
        products: [new mongoose.Types.ObjectId().toHexString(), new mongoose.Types.ObjectId().toHexString()],
        active: true
    };

    const response = await request(app)
    .patch(`/api/accounts/${new mongoose.Types.ObjectId().toHexString()}/edit`)
    .set('Cookie', cookie)
    .send(account);

    expect(response.statusCode).toBe(404);
});

it("returns a 304 if the account does exist but no change was made", async () => {
    const cookie = await global.signin(true);

    const account: AccountAttrs = {
        name: "Test Account",
        products: [new mongoose.Types.ObjectId().toHexString(), new mongoose.Types.ObjectId().toHexString()],
        active: true
    };

    const createdResponse = await request(app)
    .post("/api/accounts/create")
    .set('Cookie', cookie)
    .send(account);

    const createdAccount = createdResponse.body as AccountAttrs;

    const response = await request(app)
    .patch(`/api/accounts/${createdAccount.id}/edit`)
    .set('Cookie', cookie)
    .send(createdAccount);

    expect(response.statusCode).toBe(304);
});

it("returns a 200 if the account does exist and a change was made", async () => {
    const cookie = await global.signin(true);

    const account: AccountAttrs = {
        name: "Test Account",
        products: [new mongoose.Types.ObjectId().toHexString(), new mongoose.Types.ObjectId().toHexString()],
        active: true
    };

    const createdResponse = await request(app)
    .post("/api/accounts/create")
    .set('Cookie', cookie)
    .send(account);

    const createdAccount = createdResponse.body as AccountAttrs;

    createdAccount.name = "Test Account Modified";

    const response = await request(app)
    .patch(`/api/accounts/${createdAccount.id}/edit`)
    .set('Cookie', cookie)
    .send(createdAccount);

    expect(response.statusCode).toBe(200);
});