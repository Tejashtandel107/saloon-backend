export {}
const Joi = require("joi");

const addBookingValidator = Joi.object({
  serviceId: Joi.string().length(24).hex().required()
    .required()
    .messages({
      "string.base": "Service ID must be a string",
      "string.length": "Invalid Service ID",
      "string.hex": "Invalid Service ID",
      "any.required": "Service ID is required",
    }),

  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name must not exceed 100 characters",
      "any.required": "Name is required",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required()
    .messages({
      "string.base": "Phone number must be a string",
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be 10 to 15 digits",
      "any.required": "Phone number is required",
    }),

  bookingDateTime: Joi.string().required()
    .messages({
      "string.base": "Date must be a string",
      "string.empty": "Date is required",
      "any.required": "Booking Date is required",
    }),
});

const bookingIdParamSchema = Joi.object({
  id: Joi.string().length(24).hex().required()
    .messages({
      "string.base": "Booking ID must be a string",
      "string.length": "Invalid Booking ID",
      "string.hex": "Invalid Booking ID",
      "any.required": "Booking ID is required",
    }),
});

module.exports = { addBookingValidator, bookingIdParamSchema };