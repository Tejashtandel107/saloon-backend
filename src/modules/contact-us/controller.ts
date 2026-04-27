// modules/contact-us/index.ts
export {};

import { Request, Response, NextFunction } from "express";

const express = require("express");
const router = express.Router();

const ContactUsService = require("./service");
const contactUsService = new ContactUsService();

// GET API
router.get("/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await contactUsService.getAllContacts(req.query);

      res.json({
        success: true,
        data
      });
    } catch (error: any) {
      next(error);
    }
  }
);


// POST API
router.post("/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contact = await contactUsService.createContact(req.body);

      res.json({
        success: true,
        message: "Contact form submitted successfully",
        data: contact
      });
    } catch (error: any) {
      next(error);
    }
  }
);

module.exports = router;