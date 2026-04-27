"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const BookingService = require("./service");
const bookingService = new BookingService();
const validate = require("../../middleware/validate");
const { addBookingValidator, bookingIdParamSchema } = require("./validator");
router.get('/', async (req, res, next) => {
    try {
        const data = await bookingService.getAllBooking(req.query);
        res.json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
});
router.post('/', validate(addBookingValidator), async (req, res, next) => {
    try {
        const booking = await bookingService.createBooking(req.body);
        res.json({ success: true, data: booking });
    }
    catch (error) {
        next(error);
    }
});
router.get('/slots', async (req, res, next) => {
    try {
        const { date } = req.query;
        const slots = await bookingService.getAvailableSlots(date);
        res.json({ success: true, slots });
    }
    catch (error) {
        next(error);
    }
});
router.patch('/cancel/:id', validate(bookingIdParamSchema, 'params'), async (req, res, next) => {
    try {
        const booking = await bookingService.cancelBooking(req.params.id);
        res.json({ success: true, data: booking });
    }
    catch (error) {
        next(error);
    }
});
router.patch('/complete/:id', validate(bookingIdParamSchema, 'params'), async (req, res, next) => {
    try {
        const booking = await bookingService.completeBooking(req.params.id);
        res.json({ success: true, data: booking });
    }
    catch (error) {
        next(error);
    }
});
module.exports = router;
