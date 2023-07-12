import mongoose from "mongoose";

import { app } from "./app";
import { User } from "@testsequencer/common-backend";
import { UserAttrs, UserRole } from "@testsequencer/common";
import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    console.log(`Connecting to MongoDb @ ${process.env.MONGO_URI}...`)
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to MongoDb - "+process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
  }

  await populateDBWithTestData();

  var privateKey  = fs.readFileSync(path.resolve(__dirname, './ssl/nexuseol.key'), 'utf8');
  var certificate = fs.readFileSync(path.resolve(__dirname, './ssl/nexuseol.crt'), 'utf8');

  var credentials = {key: privateKey, cert: certificate};

  var httpServer = http.createServer(app);
  var httpsServer = https.createServer(credentials, app);

  httpServer.listen(8080, () => {
    console.log("HTTP listening on port 8080");
  });
  httpsServer.listen(8443, () => {
    console.log("HTTPS listening on port 8443");
  });
};


const populateDBWithTestData = async () => {
  const testUser: UserAttrs = {
    name: "Angel",
    level: UserRole.SUPERADMIN,
    password: '123456',
    email: "angel@nexuseol.com",
    accountId: "64a3451d5798bcda93adc630"
  };

  const existingUser = await User.findOne({ email: testUser.email });

  if(existingUser) {
    const deleted = await User.deleteOne({ email: testUser.email });
  }
  
  const user = User.build(testUser);
  await user.save();
  //const createdUser = await User.create(testUser);
  console.log('Created test user : ');
  console.log(user);
}

start();