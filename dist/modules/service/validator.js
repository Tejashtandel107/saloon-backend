"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const createServiceValidator = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().trim().min(2).required()
});
const updateServiceValidator = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().trim().min(2).required()
});
const serviceIdParamSchema = Joi.object({
    id: Joi.string().length(24).hex().required()
        .messages({
        "string.base": "Service ID must be a string",
        "string.length": "Invalid Service ID",
        "string.hex": "Invalid Service ID",
        "any.required": "Service ID is required",
    }),
});
module.exports = {
    createServiceValidator,
    updateServiceValidator,
    serviceIdParamSchema
};
