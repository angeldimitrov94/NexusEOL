import mongoose from "mongoose";

import { app } from "./app";
import { Account } from "@testsequencer/common-backend";
import { AccountAttrs } from "@testsequencer/common";
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
  const testEntity: AccountAttrs = {
    name: "NexusEOL Software Inc.",
    products: [],
    active: true
  };

  const existing = await Account.findOne({ name: testEntity.name });
  if(!existing) {
    const created = await Account.create(testEntity);
    console.log('Created test account : ');
    console.log(created);
  }
  else
  {
    const updated = await Account.updateOne({name: testEntity.name}, testEntity);
    console.log('Updated test account : ');
    console.log(updated);
  }
}

start();