export {};
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive :{
        type : Boolean,
        default : true
    },
    admin: {
      type: Boolean,
      default: false,
    },
   
    resetToken: String,
    resetTokenExpire: Date
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;