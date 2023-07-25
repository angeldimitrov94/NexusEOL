import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { UserAttrs, UserRole } from "@testsequencer/common";

declare global {
  function signin(): Promise<string[]>;
  const userName = "test@test.com";
  const userLevel = UserRole.TECHNICIAN;
  const userEmail = "test@test.com";
  const userAccountId = "123";
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const existingUser: UserAttrs = {
    name: "test@test.com",
    level: UserRole.TECHNICIAN,
    password: "123456",
    email: "test@test.com",
    accountId: "123"
  };

  //Generate JWT
  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email,
    level: existingUser.level,
    accountId: existingUser.accountId
  }, process.env.JWT_KEY!);

  return [`jwt=${userJwt}`];
};
