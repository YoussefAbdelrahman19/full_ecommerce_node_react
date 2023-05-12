import JWT from 'jsonwebtoken';
import {CustomErrorAPI, createCustomError} from '../errors/custom-error.js';
import User from '../models/users.js';

//protected routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify (
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next ();
  } catch (error) {
    return next (createCustomError ('Unauthorized', 401, false));
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById (req.user._id);
    if (user.role !== 1) {
      return next (createCustomError ('Unauthorized access', 401, false));
    } else {
      next ();
    }
  } catch (error) {
    return next (
      createCustomError (' Error in admin middleware' + error, 401, false)
    );
  }
};
