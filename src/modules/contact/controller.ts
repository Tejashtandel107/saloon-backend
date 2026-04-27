import { Request, Response, NextFunction } from "express";

const express = require("express");
const router = express.Router();
const ContactService = require("./service");
const contactService = new ContactService();
const validate = require("../../middleware/validate");
const contactValidator = require("./validator");

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await contactService.getContact();
    res.json({ success: true, data: contact });
  } catch (error: any) {
    next(error);
  }
});

router.post("/",validate(contactValidator),async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await contactService.createOrUpdateContact(req.body);
    res.json({ success: true, data: contact });
  } catch (error: any) {
    next(error);
  }
});

module.exports = router;