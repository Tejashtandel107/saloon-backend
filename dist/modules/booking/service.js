"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Booking = require("./schema");
const sendMail = require("../../service/mail");
const fs = require("fs").promises;
const path = require("path");
const emailQueue = require("../../jobs/emailQueue");
const AppError = require("../../middleware/appError");
class BookingService {
    // Get All Booking
    async getAllBooking(query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;
        // Fetch bookings with service details
        const [bookings, total] = await Promise.all([
            Booking.find()
                .populate({
                path: "serviceId",
                select: "name price description",
            })
                .sort({ bookingDateTime: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Booking.countDocuments()
        ]);
        return {
            bookings,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    // Get Available Slots
    async getAvailableSlots(date) {
        const slots = [];
        const utcDate = new Date(date + "T00:00:00Z");
        const day = utcDate.toLocaleString("en-US", {
            weekday: "long",
            timeZone: process.env.TIMEZONE
        });
        let startHour = 10;
        let endHour = 18;
        if (day === "Saturday")
            endHour = 16;
        if (day === "Sunday")
            throw new AppError("No slots available on Sunday", 400);
        for (let hour = startHour; hour < endHour; hour++) {
            const hourStr = hour.toString().padStart(2, "0");
            const nextHourStr = (hour + 1).toString().padStart(2, "0");
            slots.push(`${hourStr}:00-${nextHourStr}:00`);
        }
        return slots;
    }
    // Create Booking
    async createBooking(data) {
        const { name, email, phone, bookingDateTime } = data;
        const booking = await Booking.create(data);
        // // Admin Email
        // emailQueue.add(() =>
        //     this.sendEmail(process.env.ADMIN_EMAIL!,"New Slot Booked","adminNotification",
        //         { name, email, phone, bookingDateTime }
        //     )
        // );
        // // User Email
        // emailQueue.add(() =>this.sendEmail(email,"Slot Booking Confirmation","bookingConfirmation",
        //         { name, email, bookingDateTime }
        //     )
        // );
        return booking;
    }
    // Cancel Booking
    async cancelBooking(id) {
        const booking = await Booking.findById(id);
        if (!booking)
            throw new AppError("Booking not found", 400);
        if (booking.status === "cancel")
            throw new AppError("Booking already cancelled", 400);
        if (booking.status === "done")
            throw new AppError("Booking already completed", 400);
        booking.status = "cancel";
        await booking.save();
        const slot = `${booking.date} ${booking.time}`;
        emailQueue.add(() => this.sendEmail(booking.email, "Booking Cancelled", "bookingCancelled", { name: booking.name, email: booking.email, slot }));
        return booking;
    }
    // Complete Booking
    async completeBooking(id) {
        const booking = await Booking.findById(id);
        if (!booking)
            throw new AppError("Booking not found", 400);
        if (booking.status === "cancel")
            throw new AppError("Cannot complete cancelled booking", 400);
        if (booking.status === "done")
            throw new AppError("Booking already completed", 400);
        booking.status = "done";
        await booking.save();
        const slot = `${booking.date} ${booking.time}`;
        emailQueue.add(() => this.sendEmail(booking.email, "Booking Completed", "bookingCompleted", { name: booking.name, email: booking.email, slot }));
        return booking;
    }
    // Dynamic Email Sender
    async sendEmail(to, subject, template, variables) {
        const filePath = path.join(__dirname, `../../view/${template}.html`);
        let html = await fs.readFile(filePath, "utf-8");
        Object.keys(variables).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, "g");
            html = html.replace(regex, variables[key]);
        });
        await sendMail(to, subject, html);
    }
}
module.exports = BookingService;
