export  {};
const Contact = require("../contact/schema");
const Booking = require("../booking/schema");
const Service = require("../service/schema");
const Faq = require("../faq/schema");

class DashboardService {
  async dashboardStats() {
    const [contacts, bookings, services, faqs] = await Promise.all([
      Contact.countDocuments(),
      Booking.countDocuments(),
      Service.countDocuments(),
      Faq.countDocuments()
    ]);

    return {contacts,bookings,services,faqs};
  }
}

module.exports = DashboardService;