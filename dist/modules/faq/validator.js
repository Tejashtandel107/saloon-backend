"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// CREATE FAQ VALIDATOR
const faqValidator = joi_1.default.object({
    question: joi_1.default.string()
        .min(5)
        .max(300)
        .required()
        .messages({
        "string.base": "Question must be a string",
        "string.empty": "Question is required",
        "string.min": "Question must be at least 5 characters",
        "string.max": "Question must not exceed 300 characters",
        "any.required": "Question is required",
    }),
    answer: joi_1.default.string()
        .min(10)
        .required()
        .messages({
        "string.base": "Answer must be a string",
        "string.empty": "Answer is required",
        "string.min": "Answer must be at least 10 characters",
        "any.required": "Answer is required",
    }),
    sortOrder: joi_1.default.number()
        .integer()
        .min(0)
        .optional()
        .messages({
        "number.base": "Sort order must be a number",
        "number.integer": "Sort order must be an integer",
        "number.min": "Sort order cannot be negative",
    }),
});
// UPDATE FAQ VALIDATOR
const updateFaqValidator = joi_1.default.object({
    question: joi_1.default.string()
        .min(5)
        .max(300)
        .optional()
        .messages({
        "string.base": "Question must be a string",
        "string.min": "Question must be at least 5 characters",
        "string.max": "Question must not exceed 300 characters",
    }),
    answer: joi_1.default.string()
        .min(10)
        .optional()
        .messages({
        "string.base": "Answer must be a string",
        "string.min": "Answer must be at least 10 characters",
    }),
    sortOrder: joi_1.default.number()
        .integer()
        .min(0)
        .optional()
        .messages({
        "number.base": "Sort order must be a number",
        "number.integer": "Sort order must be an integer",
        "number.min": "Sort order cannot be negative",
    }),
});
// ID VALIDATOR
const faqIdValidator = joi_1.default.object({
    id: joi_1.default.string()
        .length(24)
        .hex()
        .required()
        .messages({
        "string.base": "FAQ ID must be a string",
        "string.length": "Invalid FAQ ID",
        "string.hex": "Invalid FAQ ID",
        "any.required": "FAQ ID is required",
    }),
});
module.exports = {
    faqValidator,
    updateFaqValidator,
    faqIdValidator
};
