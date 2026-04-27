// seed.ts
require("dotenv").config();

import mongoose from "mongoose";
const bcrypt = require("bcryptjs");
const User = require("./modules/user/schema");

mongoose.connect(process.env.MONGODB_URI as string);

const createAdmin = async (): Promise<void> => {
  try {
    const hashedPassword: string = await bcrypt.hash(
      process.env.PASSWORD as string,
      10
    );

    const newAdmin = new User({
      email: process.env.EMAIL,
      password: hashedPassword,
      admin: true,
    });

    await newAdmin.save();

    console.log("✅ Admin user created successfully!");
    process.exit(0);
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = createAdmin;