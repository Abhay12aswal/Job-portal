import ErrorHandler from "../utils/errorHandler.js";

const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    // Handle MongoDB CastError
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Handle Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // Handle JWT errors
    if (err.name === "JsonWebTokenError") {
        const message = "JSON Web Token is invalid. Try again.";
        err = new ErrorHandler(message, 400);
    }

    // Handle JWT expiration error
    if (err.name === "TokenExpiredError") {
        const message = "JSON Web Token has expired. Try again.";
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default errorMiddleware;
