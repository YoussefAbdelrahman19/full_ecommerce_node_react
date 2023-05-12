import {CustomErrorAPI} from '../errors/custom-error.js';
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    console.log (
      'err in error handler middleware from custom ',
      err.message + 'here is the msg'
    );
    return res.status (err.statusCode).json ({
      err,
      message: err.message,
      status: err.statusCode,
      success: err.success,
    });
  }
  console.log ('fired 1 ');
  return res
    .status (500)
    .json ({message: 'Something went wrong, please try again'});
  console.log ('fired 2 ');
};

export default errorHandlerMiddleware;
