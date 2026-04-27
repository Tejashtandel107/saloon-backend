"use strict";
module.exports = (req, res, next) => {
    const error = new Error(`Request not found`);
    error.statusCode = 404;
    next(error);
};
