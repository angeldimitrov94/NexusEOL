import mongoose from "mongoose";

import { app } from "./app";
import { Account } from "@testsequencer/common-backend";
import { AccountAttrs } from "@testsequencer/common";

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

  app.listen(5000, () => {
    console.log("Listening on port 5000");
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