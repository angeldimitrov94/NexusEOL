import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { AccountAttrs } from "@testsequencer/common";

it("returns a 401 if user is not signed in", async () => {
  return await request(app)
    .get("/api/accounts/1234")
    .expect(401);
});

it("returns a 401 if user is signed in but is not a superadmin user role", async () => {
  const cookie = await global.signin(false);

  return await request(app)
    .get("/api/accounts/1234")
    .set('Cookie', cookie)
    .expect(401);
});

it("returns a 400 if non-valid mongo object id is specified in query param", async () => {
  const cookie = await global.signin(true);

  const response = await request(app)
    .get("/api/accounts/1234")
    .set('Cookie', cookie);
  
  expect(response.statusCode).toBe(400);
});

it("returns a 404 if no accounts match", async () => {
  const cookie = await global.signin(true);
  const accountId = new mongoose.Types.ObjectId().toHexString();

  const response = await request(app)
    .get("/api/accounts/" + accountId)
    .set('Cookie', cookie);
  
  expect(response.statusCode).toBe(404);
});

it("returns a 200 with valid data if account is found", async () => {
  const cookie = await global.signin(true);
  const account: AccountAttrs = {
    name: "Test Account",
    products: [],
    active: true
  };
  const createResponse = await request(app)
    .post("/api/accounts/create")
    .set('Cookie', cookie)
    .send(account);
    
  const createdAccount: AccountAttrs = createResponse.body as AccountAttrs;
  
  const accountId = createdAccount.id;

  const response = await request(app)
    .get("/api/accounts/" + accountId)
    .set('Cookie', cookie);
  
  expect(response.statusCode).toBe(200);
  const responseAccount: AccountAttrs = response.body;
  expect(responseAccount.active).toEqual(createdAccount.active);
  expect(responseAccount.id).toEqual(createdAccount.id);
  expect(responseAccount.name).toEqual(createdAccount.name);
  expect(responseAccount.products).toEqual(createdAccount.products);
});