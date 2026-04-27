export {};

const FAQ = require("./schema");
const AppError = require("../../middleware/appError");

class FaqService {

  // CREATE FAQ
  async createFaq(data: any) {
    const faq = await FAQ.create(data);
    return faq;
  }

  // GET ALL FAQ
  async getFaqs() {
    return await FAQ.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
  }

  // UPDATE FAQ
  async updateFaq(id: string, data: any) {
    const faq = await FAQ.findByIdAndUpdate(id, data, {
      returnDocument: "after"
    });

    if (!faq) {
      throw new AppError("FAQ not found", 400);
    }
    return faq;
  }

  // DELETE FAQ
  async deleteFaq(id: string) {
    const faq = await FAQ.findByIdAndDelete(id);

    if (!faq) {
      throw new AppError("FAQ not found", 400);
    }

    return faq;
  }
}

module.exports = FaqService;