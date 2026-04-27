"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    bookingDateTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "cancel", "done"],
        default: "pending"
    }
}, { timestamps: true });
const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
