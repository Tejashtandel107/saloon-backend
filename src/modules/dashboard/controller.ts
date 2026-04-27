import { Request, Response, NextFunction } from "express";

const express = require("express");
const router = express.Router();
const Service = require("./service");
const service = new Service();

// Get Contact
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.dashboardStats();
    res.json({ success: true, data: result });
  } catch (error: any) {
    next(error);
  }
});

module.exports = router;