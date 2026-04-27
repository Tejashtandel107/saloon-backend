"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contact = require("./schema");
class ContactService {
    async getContact() {
        return await Contact.find().select("contact email address -_id").lean();
    }
    async createOrUpdateContact(data) {
        let contact = await Contact.findOne();
        if (contact) {
            contact.contact = data.contact;
            contact.email = data.email;
            contact.address = data.address;
            await contact.save();
            return contact;
        }
        else {
            contact = await Contact.create(data);
            return contact;
        }
    }
}
module.exports = ContactService;
