"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// seed.ts
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt = require("bcryptjs");
const User = require("./modules/user/schema");
mongoose_1.default.connect(process.env.MONGODB_URI);
const createAdmin = async () => {
    try {
        const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 10);
        const newAdmin = new User({
            email: process.env.EMAIL,
            password: hashedPassword,
            admin: true,
        });
        await newAdmin.save();
        console.log("✅ Admin user created successfully!");
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
module.exports = createAdmin;
