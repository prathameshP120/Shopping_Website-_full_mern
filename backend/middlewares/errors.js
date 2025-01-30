import ErrorHandler from "../utils/errorHandler.js";
export default (err, req, res, next) => {
  //lets create error object
  //is used to initialize an error object with default values for the status code and message
  let error = {
    statusCode: err?.statusCode || 500, //500 is for internal server error
    message: err?.message || "Internal Server Error",
  };

  // Handle Invalid Mongoose ID Error
  // in postman we we want to get product details(GET Product Details) at that time we get this error name(CastError)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err?.path}`;
    error = new ErrorHandler(message, 404);
  }

  // Handle Validation Error . In postmon if we get error name:"validationError" while Post create new product
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 400);
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    error = new ErrorHandler(message, 404);
  }

  // Handle wrong JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `JSON Web Token is invalid. Try Again!!!`;
    error = new ErrorHandler(message, 400);
  }

  // Handle expired JWT Error
  if (err.name === "TokenExpiredError") {
    const message = `JSON Web Token is expired. Try Again!!!`;
    error = new ErrorHandler(message, 400);
  }

  //by using stack we can track our error easily in developement

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(error.statusCode).json({
      message: error.message,
      error: err,
      stack: err?.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
};
