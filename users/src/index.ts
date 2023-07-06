import mongoose from "mongoose";

import { app } from "./app";
import { Password, User } from "@testsequencer/common-backend";
import { UserAttrs, UserRole } from "@testsequencer/common";

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
  const testUser: UserAttrs = {
    name: "Angel",
    level: UserRole.SUPERADMIN,
    password: '123456',
    email: "angel@nexus.eol",
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