import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { AccountAttrs } from "@testsequencer/common";

it("returns a 401 if user is not signed in", async () => {
  return await request(app)
    .get("/api/accounts")
    .expect(401);
});

it("returns a 401 if user is signed in but is not a superadmin user role", async () => {
  const cookie = await global.signin(false);

  return await request(app)
    .get("/api/accounts")
    .set('Cookie', cookie)
    .expect(401);
});

it("returns a 200 with an empty array if no accounts are defined", async () => {
  const cookie = await global.signin(true);

  const response = await request(app)
    .get("/api/accounts")
    .set('Cookie', cookie);

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

it("returns a 200 with valid data if accounts are found", async () => {
  const cookie = await global.signin(true);
  const productId1 = new mongoose.Types.ObjectId().toHexString();
  const productId2 = new mongoose.Types.ObjectId().toHexString();
  const productId3 = new mongoose.Types.ObjectId().toHexString();
  const productId4 = new mongoose.Types.ObjectId().toHexString();
  const account1: AccountAttrs = {
    name: "Test Account 1",
    products: [productId1, productId2],
    active: true
  };
  const createResponse1 = await request(app)
    .post("/api/accounts/create")
    .set('Cookie', cookie)
    .send(account1);
  expect(createResponse1.statusCode).toBe(201);
  const account2: AccountAttrs = {
    name: "Test Account 2",
    products: [productId3, productId4],
    active: true
  };
  const createResponse2 = await request(app)
    .post("/api/accounts/create")
    .set('Cookie', cookie)
    .send(account2);
  expect(createResponse2.statusCode).toBe(201);

  const createdAccount1: AccountAttrs = createResponse1.body as AccountAttrs;
  
  const createdAccount2: AccountAttrs = createResponse2.body as AccountAttrs;

  const response = await request(app)
    .get("/api/accounts")
    .set('Cookie', cookie);

  expect(response.statusCode).toBe(200);
  expect(response.body.length).toEqual(2);
  const responseAccounts: AccountAttrs[] = [];
  response.body.map((item: AccountAttrs) => {
    if(item)
      responseAccounts.push(item);
  });
  
  const responseAccount1: AccountAttrs | undefined = responseAccounts.find(item => item.id === createdAccount1.id);
  expect(responseAccount1).toBeDefined();
  expect(responseAccount1?.active).toEqual(createdAccount1.active);
  expect(responseAccount1?.id).toEqual(createdAccount1.id);
  expect(responseAccount1?.name).toEqual(createdAccount1.name);
  expect(responseAccount1?.products).toEqual(createdAccount1.products);

  const responseAccount2: AccountAttrs | undefined = responseAccounts.find(item => item.id === createdAccount2.id);
  expect(responseAccount2).toBeDefined();
  expect(responseAccount2?.active).toEqual(createdAccount2.active);
  expect(responseAccount2?.id).toEqual(createdAccount2.id);
  expect(responseAccount2?.name).toEqual(createdAccount2.name);
  expect(responseAccount2?.products).toEqual(createdAccount2.products);
});

it("returns a 200 with valid data if accounts are found and that adheres to the page and limit parameters", async () => {
  const cookie = await global.signin(true);

  type AccountDictionary = { [key: string]: AccountAttrs };
  const createdAccounts: AccountDictionary = {};
  const accountCount = 57;
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
    const createdAccount: AccountAttrs = createResponse.body as AccountAttrs;
    if(createdAccount && createdAccount.id){
      createdAccounts[createdAccount.id] = createdAccount;
    }
  } 

  const page = 1;
  const limit = 5;
  const response = await request(app)
    .get(`/api/accounts?page=${page}&limit=${limit}`)
    .set('Cookie', cookie);

  expect(response.statusCode).toBe(200);
  expect(response.body.length).toEqual(limit);
  response.body.forEach((retrievedAccount: AccountAttrs) => {
    if(retrievedAccount && retrievedAccount.id){
      expect(retrievedAccount.active).toEqual(createdAccounts[retrievedAccount.id].active);
      expect(retrievedAccount.name).toEqual(createdAccounts[retrievedAccount.id].name);
      expect(retrievedAccount.products).toEqual(createdAccounts[retrievedAccount.id].products);
    }
  });
});