"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const ContactService = require("./service");
const contactService = new ContactService();
const validate = require("../../middleware/validate");
const contactValidator = require("./validator");
router.get("/", async (req, res, next) => {
    try {
        const contact = await contactService.getContact();
        res.json({ success: true, data: contact });
    }
    catch (error) {
        next(error);
    }
});
router.post("/", validate(contactValidator), async (req, res, next) => {
    try {
        const contact = await contactService.createOrUpdateContact(req.body);
        res.json({ success: true, data: contact });
    }
    catch (error) {
        next(error);
    }
});
module.exports = router;
