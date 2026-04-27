"use strict";
const Joi = require("joi");
const loginValidator = Joi.object({
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().min(6).max(30).required()
});
const forgotPasswordValidator = Joi.object({
    email: Joi.string().email().lowercase().trim().required()
});
const resetPasswordValidator = Joi.object({
    token: Joi.string().trim().required(),
    password: Joi.string().min(6).max(30).required(),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required()
});
module.exports = {
    loginValidator,
    forgotPasswordValidator,
    resetPasswordValidator
};
