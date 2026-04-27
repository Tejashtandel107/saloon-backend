export  {};
const Contact = require("../contact/schema");
const Booking = require("../booking/schema");
const Service = require("../service/schema");

class DashboardService {
  async dashboardStats() {
    const [contacts, bookings, services] = await Promise.all([
      Contact.countDocuments(),
      Booking.countDocuments(),
      Service.countDocuments(),
    ]);

    return {contacts,bookings,services};
  }
}

module.exports = DashboardService;