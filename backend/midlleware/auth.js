const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const ErrorHandler = require("../utils/ErrorHandler");

const isAuthenticatedUser = expressAsyncHandler(async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("Please login to access this request", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodedData.id);
  if (!req.user) return next(new ErrorHandler("User not found"), 401);
  next();
});

const isAdmin = (roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} can not access this resources`, 403)
      );
    }
    next();
  };
};
module.exports = { isAuthenticatedUser, isAdmin };
