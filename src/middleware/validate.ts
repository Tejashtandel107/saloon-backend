import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
type RequestProperty = "body" | "params" | "query";

const validate = (schema: ObjectSchema, property: RequestProperty = "body") => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, value } = schema.validate(req[property], {
                abortEarly: false,
                stripUnknown: true,
            });

            if (error) {
                return res.status(400).json({
                    status: false,
                    message: error.details.map((e: any) => e.message),
                });
            }

            req[property] = value;
            next();
        } catch (err: any) {
            err.statusCode = 400;
            next(err);
        }
    };
};

module.exports = validate;










