// modules/faq/validator.ts
export {};

import Joi from "joi";

// CREATE FAQ VALIDATOR
const faqValidator = Joi.object({
  question: Joi.string()
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

  answer: Joi.string()
    .min(10)
    .required()
    .messages({
      "string.base": "Answer must be a string",
      "string.empty": "Answer is required",
      "string.min": "Answer must be at least 10 characters",
      "any.required": "Answer is required",
    }),

  sortOrder: Joi.number()
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
const updateFaqValidator = Joi.object({
  question: Joi.string()
    .min(5)
    .max(300)
    .optional()
    .messages({
      "string.base": "Question must be a string",
      "string.min": "Question must be at least 5 characters",
      "string.max": "Question must not exceed 300 characters",
    }),

  answer: Joi.string()
    .min(10)
    .optional()
    .messages({
      "string.base": "Answer must be a string",
      "string.min": "Answer must be at least 10 characters",
    }),

  sortOrder: Joi.number()
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
const faqIdValidator = Joi.object({
  id: Joi.string()
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