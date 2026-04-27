"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const AuthService = require("../auth/service");
const authService = new AuthService();
const validate = require('../../middleware/validate');
const { loginValidator, forgotPasswordValidator, resetPasswordValidator } = require('./validator');
// LOGIN
router.post("/signin", validate(loginValidator), async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = await authService.login(email, password);
        res.json({
            data: { user: data.user, token: data.token },
            message: "Login successful",
        });
    }
    catch (err) {
        next(err);
    }
});
// FORGOT PASSWORD
router.post("/forgot-password", validate(forgotPasswordValidator), async (req, res, next) => {
    try {
        const { email } = req.body;
        const resetToken = await authService.forgotPassword(email);
        res.json({
            success: true,
            message: "Password reset token generated",
            token: resetToken
        });
    }
    catch (err) {
        next(err);
    }
});
// RESET PASSWORD
router.post("/reset-password", validate(resetPasswordValidator), async (req, res, next) => {
    try {
        const { token, password } = req.body;
        await authService.resetPassword(token, password);
        res.json({
            success: true,
            message: "Password reset successfully"
        });
    }
    catch (err) {
        next(err);
    }
});
module.exports = router;
