//This the custom error handler class

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // super is the constructor of the parent class
    this.statusCode = statusCode;

    //Create stack property->this property is showing in only developement
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
