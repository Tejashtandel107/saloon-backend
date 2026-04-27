"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContactUs = require("./schema");
class ContactUsService {
    // POST
    async createContact(data) {
        const contact = await ContactUs.create(data);
        return contact;
    }
    // GET
    async getAllContacts(query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;
        const [contacts, total] = await Promise.all([
            ContactUs.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            ContactUs.countDocuments()
        ]);
        return {
            contacts,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
}
module.exports = ContactUsService;
