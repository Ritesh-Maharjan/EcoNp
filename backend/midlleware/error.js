const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Intenral server error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found with this id... Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "jsonWebTokenError") {
    const message = `JSON web token is invalid , please try again`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT expired
  if (err.name === "TokenExpiredError") {
    const message = `JSON web token is expired, please try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
