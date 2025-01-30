export default (controllerFunction) => (req, res, next) =>
  Promise.resolve(controllerFunction(req, res, next)).catch(next);

/*
above code using Async-Await  formate are as follows
const catchAsyncErrors = (controllerFunction) => {
  return async (req, res, next) => {
    try {
      await controllerFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsyncErrors; 


First of all we are exporting here default function in that we have our controller function so 
  this default fun returns another function in which we have request response and then the next that 
  function return a promise , promise is resolved in that we will simply pass our controller function,
  we will simply invoke our controller function if there is error ,this cache will catch that error and pass 
  that error to the next middleware
*/
