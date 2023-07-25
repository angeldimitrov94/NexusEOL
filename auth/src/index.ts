import mongoose from "mongoose";

import { app } from "./app";
import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';
import { envParser } from "@testsequencer/common";

const start = async () => {
  await envParser(path.join(__dirname, '..'));

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    console.log(`Connecting to MongoDb @ ${process.env.MONGO_URI}...`)
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDb - "+process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
  }
  
  let devFlag: boolean = false;

  if(process.env.DEV) {
    devFlag = process.env.DEV === "1";
  }

  const sslPath = devFlag ? './ssl/nexuseol_com_test' : './ssl/nexuseol_com';

  var privateKey  = fs.readFileSync(path.resolve(__dirname, sslPath+".key"), 'utf8');
  var certificate = fs.readFileSync(path.resolve(__dirname, sslPath+".crt"), 'utf8');

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

start();
