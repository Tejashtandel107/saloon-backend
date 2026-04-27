"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FAQ = require("./schema");
const AppError = require("../../middleware/appError");
class FaqService {
    // CREATE FAQ
    async createFaq(data) {
        const faq = await FAQ.create(data);
        return faq;
    }
    // GET ALL FAQ
    async getFaqs() {
        return await FAQ.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
    }
    // UPDATE FAQ
    async updateFaq(id, data) {
        const faq = await FAQ.findByIdAndUpdate(id, data, {
            returnDocument: "after"
        });
        if (!faq) {
            throw new AppError("FAQ not found", 400);
        }
        return faq;
    }
    // DELETE FAQ
    async deleteFaq(id) {
        const faq = await FAQ.findByIdAndDelete(id);
        if (!faq) {
            throw new AppError("FAQ not found", 400);
        }
        return faq;
    }
}
module.exports = FaqService;
