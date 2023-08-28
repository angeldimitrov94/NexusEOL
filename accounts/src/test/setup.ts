import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { UserRole } from "@testsequencer/common";
import jwt from "jsonwebtoken";

declare global {
  function signin(isSuperAdmin: boolean): Promise<string>;
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

global.signin = async (isSuperAdmin: boolean) => {
  //build a jwt payload (UserAttr object)
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@email.com",
    level: isSuperAdmin ? UserRole.SUPERADMIN : UserRole.ADMIN,
    accountId: new mongoose.Types.ObjectId().toHexString(),
    exp: Math.floor(Date.now() / 1000) + (30 * 60) //expire after 30 minutes from issuance
  };
  //create the jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  //build session object {jwt:MY_JWT}
  const session = { jwt: token };
  //turn session into JSON
  const sessionJSON = JSON.stringify(session);
  //take JSON and encode as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  //return string thats the cookie with the encoded data
  return `session=${base64}`;
};