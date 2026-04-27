"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const Services = require("./service");
const Service = new Services();
const validate = require("../../middleware/validate");
const { createServiceValidator, updateServiceValidator, serviceIdParamSchema } = require("./validator");
router.get("/", async (req, res, next) => {
    try {
        const services = await Service.getAll(req.query);
        res.json({
            success: true,
            services
        });
    }
    catch (err) {
        next(err);
    }
});
router.post("/", validate(createServiceValidator), async (req, res, next) => {
    try {
        const service = await Service.create(req.body);
        res.json({
            success: true,
            service
        });
    }
    catch (err) {
        next(err);
    }
});
router.get('/:id', validate(serviceIdParamSchema, 'params'), async (req, res, next) => {
    try {
        const service = await Service.getById(req.params.id);
        res.json({
            success: true,
            service
        });
    }
    catch (err) {
        next(err);
    }
});
router.put("/:id", validate(serviceIdParamSchema, 'params'), validate(updateServiceValidator), async (req, res, next) => {
    try {
        const service = await Service.update(req.params.id, req.body);
        res.json({
            success: true,
            service
        });
    }
    catch (err) {
        next(err);
    }
});
router.delete("/:id", validate(serviceIdParamSchema, 'params'), async (req, res, next) => {
    try {
        await Service.delete(req.params.id);
        res.json({
            success: true,
            message: "Service deleted"
        });
    }
    catch (err) {
        next(err);
    }
});
module.exports = router;
