"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const Service = require("./service");
const service = new Service();
// Get Contact
router.get("/", async (req, res, next) => {
    try {
        const result = await service.dashboardStats();
        res.json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
});
module.exports = router;
