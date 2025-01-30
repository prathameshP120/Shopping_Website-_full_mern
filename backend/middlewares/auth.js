import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Checks if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  /*
  This line extracts the token from the cookies sent in the HTTP request.
   In most authentication setups,
    the JWT is stored in a cookie on the client side and sent to the server with each request
  */
  console.log(token);

  if (!token) {
    return next(new ErrorHandler("login first to access this resource ", 401)); //401 for Anauthrized
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});

//autherized user roles
export const authorizeRoles = (...roles) => {
  //in this function we are goging to return another function where we have request,response,and next ,this is middleware function in that we will simply check that if these roles doesnot contain the current user role, this means that user is not autherized to access this resource we simply return from here error with this role is not allowed to access this resource and for three status code so now it will autherize  the role for us.
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
