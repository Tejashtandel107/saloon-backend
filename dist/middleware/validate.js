"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema, property = "body") => {
    return (req, res, next) => {
        try {
            const { error, value } = schema.validate(req[property], {
                abortEarly: false,
                stripUnknown: true,
            });
            if (error) {
                return res.status(400).json({
                    status: false,
                    message: error.details.map((e) => e.message),
                });
            }
            req[property] = value;
            next();
        }
        catch (err) {
            err.statusCode = 400;
            next(err);
        }
    };
};
module.exports = validate;
