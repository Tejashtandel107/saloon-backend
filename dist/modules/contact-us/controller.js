"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const ContactUsService = require("./service");
const contactUsService = new ContactUsService();
// GET API
router.get("/", async (req, res, next) => {
    try {
        const data = await contactUsService.getAllContacts(req.query);
        res.json({
            success: true,
            data
        });
    }
    catch (error) {
        next(error);
    }
});
// POST API
router.post("/", async (req, res, next) => {
    try {
        const contact = await contactUsService.createContact(req.body);
        res.json({
            success: true,
            message: "Contact form submitted successfully",
            data: contact
        });
    }
    catch (error) {
        next(error);
    }
});
module.exports = router;
