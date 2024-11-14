import jwt from "jsonwebtoken";
import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decode = await jwt.verify(token, process.env.SECRET_KEY);

  if (!decode) {
    return next(new ErrorHandler("Invalid token", 401));
  }

  req.id= decode.userId;
  next();
});


export default isAuthenticated;