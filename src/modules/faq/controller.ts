import { Request, Response, NextFunction } from "express";

const express = require("express");
const router = express.Router();
const FaqService = require("./service");
const faqService = new FaqService();
const validate = require("../../middleware/validate");
const {faqValidator,faqIdValidator,updateFaqValidator} = require("./validator");

// GET ALL FAQ
router.get("/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await faqService.getFaqs();

      res.json({success: true,data});
    } catch (error: any) {
      next(error);
    }
  }
);

// CREATE FAQ
router.post("/",validate(faqValidator),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const faq = await faqService.createFaq(req.body);

      res.json({
        success: true,
        message: "FAQ created successfully",
        data: faq
      });
    } catch (error: any) {
      next(error);
    }
  }
);

// UPDATE FAQ
router.put("/:id",validate(faqIdValidator,'params'),validate(updateFaqValidator),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const faq = await faqService.updateFaq(req.params.id, req.body);

      res.json({
        success: true,
        message: "FAQ updated successfully",
        data: faq
      });
    } catch (error: any) {
      next(error);
    }
  }
);

// DELETE FAQ
router.delete("/:id",validate(faqIdValidator,'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await faqService.deleteFaq(req.params.id);

      res.json({
        success: true,
        message: "FAQ deleted successfully"
      });
    } catch (error: any) {
      next(error);
    }
  }
);

module.exports = router;