import {CustomErrorAPI, createCustomError} from '../errors/custom-error.js';
import User from '../models/users.js';
import {hashPassword, comparePassword} from '../helpers/authHelper.js';
import JWT from 'jsonwebtoken';
export const register = async (req, res, next) => {
  try {
    const {name, email, password, phone, address} = req.body;
    //validtation
    console.log ('one', req.body);

    // return ;
    if (!name || !email || !password || !phone || !address) {
      console.log ('falsey 1');
      return next (createCustomError ('All fields are required.', 422, false));
    }

    //check user
    console.log ('two', req.body);
    const existingUser = await User.findOne ({email});
    //existing user
    if (existingUser) {
      return res
        .status (200)
        .json ({message: 'User already exists, please login', success: false});
    }
    const hashedPassword = await hashPassword (password);
    const newUser = await User.create ({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });
    res
      .status (201)
      .json ({success: true, message: 'user register successfully', newUser});
  } catch (error) {
    return next (
      createCustomError ('error in registeration ' + error, 500, false)
    );
  }
};
//POST login
export const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    //validtation
    if (!email || !password) {
      return next (
        createCustomError ('Invalid email or password! ', 404, false)
      );
    }
    //check user
    const user = await User.findOne ({email});
    if (!user) {
      return next (createCustomError ('Email not found!', 404, false));
    }
    const matchedPassword = await comparePassword (password, user.password);
    if (!matchedPassword) {
      return next (createCustomError ('Invalid password!', 200, false));
    }
    const token = await JWT.sign (
      {_id: user._id, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: '1d'}
    );
    res.status (200).json ({
      success: true,
      message: 'user logged in successfully',
      user,
      token,
    });
  } catch (error) {
    return next (createCustomError ('error in login ' + error, 500, false));
  }
};
