module.exports = (req:any, res:any, next:any) => {
    const error:any = new Error(`Request not found`);
    error.statusCode = 404;
    next(error);
};