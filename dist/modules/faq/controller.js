"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const FaqService = require("./service");
const faqService = new FaqService();
const validate = require("../../middleware/validate");
const { faqValidator, faqIdValidator, updateFaqValidator } = require("./validator");
// GET ALL FAQ
router.get("/", async (req, res, next) => {
    try {
        const data = await faqService.getFaqs();
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
});
// CREATE FAQ
router.post("/", validate(faqValidator), async (req, res, next) => {
    try {
        const faq = await faqService.createFaq(req.body);
        res.json({
            success: true,
            message: "FAQ created successfully",
            data: faq
        });
    }
    catch (error) {
        next(error);
    }
});
// UPDATE FAQ
router.put("/:id", validate(faqIdValidator, 'params'), validate(updateFaqValidator), async (req, res, next) => {
    try {
        const faq = await faqService.updateFaq(req.params.id, req.body);
        res.json({
            success: true,
            message: "FAQ updated successfully",
            data: faq
        });
    }
    catch (error) {
        next(error);
    }
});
// DELETE FAQ
router.delete("/:id", validate(faqIdValidator, 'params'), async (req, res, next) => {
    try {
        await faqService.deleteFaq(req.params.id);
        res.json({
            success: true,
            message: "FAQ deleted successfully"
        });
    }
    catch (error) {
        next(error);
    }
});
module.exports = router;
