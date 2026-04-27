"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const authRoutes = require('../modules/auth/controller');
const serviceRoutes = require("../modules/service/controller");
const bookingRoutes = require("../modules/booking/controller");
const contactRoutes = require("../modules/contact/controller");
const dashboardRoutes = require("../modules/dashboard/controller");
// auth routes
router.use('/api', authRoutes);
// product routes
router.use("/api/services", serviceRoutes);
// booking routes
router.use("/api/bookings", bookingRoutes);
// contact routes
router.use("/api/contact", contactRoutes);
// dashboard routes
router.use("/api/dashboard", dashboardRoutes);
module.exports = router;
