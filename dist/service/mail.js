"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
const sendMail = async (to, subject, html) => {
    await transporter.sendMail({
        from: `"Salon App" <${process.env.APP_MAIL}>`,
        to,
        subject,
        html
    });
};
module.exports = sendMail;
