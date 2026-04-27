"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../user/schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodeCrypto = require("crypto");
const sendMail = require('../../service/mail');
const fs = require('fs');
const path = require('path');
const AppError = require("../../middleware/appError");
module.exports = class AuthService {
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }
        if (!user.isActive)
            throw new AppError("Please Contact Administrator", 400);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return { user, token };
    }
    async forgotPassword(email) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        if (!user.isActive)
            throw new AppError("Please Contact Administrator", 403);
        const resetToken = nodeCrypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpire = Date.now() + 10 * 60 * 1000;
        await user.save();
        await this.sendResetPasswordEmail(user.email, resetToken);
        return resetToken;
    }
    async sendResetPasswordEmail(email, resetToken) {
        const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken}`;
        const filePath = path.join(__dirname, "../../view/forgetpassword.html");
        let html = fs.readFileSync(filePath, "utf-8");
        // Replace placeholders
        html = html.replace("{{resetLink}}", resetLink);
        html = html.replace("{{email}}", email);
        // Send the email
        await sendMail(email, "Password Reset", html);
    }
    async resetPassword(token, password) {
        const user = await User.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() }, isActive: true });
        if (!user) {
            throw new AppError("Invalid or expired token", 400);
        }
        if (!user.isActive)
            throw new AppError("Please Contact Administrator", 403);
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpire = undefined;
        await user.save();
        return true;
    }
};
