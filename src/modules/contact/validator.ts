import Joi from "joi";

const contactValidator = Joi.object({
  contact: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.base": "Contact must be a string",
      "string.pattern.base": "Contact number must be 10 to 15 digits",
      "any.required": "Contact is required",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),

  address: Joi.string()
    .min(5)
    .required()
    .messages({
      "string.base": "Address must be a string",
      "string.min": "Address must be at least 5 characters",
      "any.required": "Address is required",
    }),
});

module.exports = contactValidator;