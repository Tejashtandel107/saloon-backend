"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const contactValidator = joi_1.default.object({
    contact: joi_1.default.string()
        .pattern(/^[0-9]{10,15}$/)
        .required()
        .messages({
        "string.base": "Contact must be a string",
        "string.pattern.base": "Contact number must be 10 to 15 digits",
        "any.required": "Contact is required",
    }),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        "string.base": "Email must be a string",
        "string.email": "Invalid email format",
        "any.required": "Email is required",
    }),
    address: joi_1.default.string()
        .min(5)
        .required()
        .messages({
        "string.base": "Address must be a string",
        "string.min": "Address must be at least 5 characters",
        "any.required": "Address is required",
    }),
});
module.exports = contactValidator;
