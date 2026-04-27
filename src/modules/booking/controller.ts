export {};
import { Request, Response, NextFunction } from "express";
const express = require("express");
const router = express.Router();
const BookingService = require("./service");
const bookingService = new BookingService();

const validate = require("../../middleware/validate");
const { addBookingValidator,bookingIdParamSchema } = require("./validator");

router.get('/',async (req: Request, res: Response,next:NextFunction) => {
    try {
        const data = await bookingService.getAllBooking(req.query);
        res.json({success: true,data});
    } catch (error: any) {
        next(error);
    }
});

router.post('/',validate(addBookingValidator), 
    async (req: Request, res: Response,next:NextFunction) => {
        try {
            const booking = await bookingService.createBooking(req.body);
            res.json({success: true,data: booking});
        } catch (error: any) {
            next(error);
        }
    }
);

router.get('/slots',async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { date } = req.query;
        const slots = await bookingService.getAvailableSlots(date as string);
        res.json({success: true,slots});
    } catch (error: any) {
        next(error);
    }
});

router.patch('/cancel/:id',validate(bookingIdParamSchema,'params'), 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const booking = await bookingService.cancelBooking(req.params.id);
            res.json({ success: true, data: booking });
        } catch (error: any) {
            next(error);
        }
    }
);

router.patch('/complete/:id',validate(bookingIdParamSchema,'params'), 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const booking = await bookingService.completeBooking(req.params.id);
            res.json({ success: true, data: booking });
        } catch (error: any) {
            next(error);
        }
    }
);

module.exports = router;