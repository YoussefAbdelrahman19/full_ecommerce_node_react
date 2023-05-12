import express from 'express';
import {register, login} from '../controllers/auth.js';
import {requireSignIn, isAdmin} from '../middlewares/auth.js';
import {CustomErrorAPI, createCustomError} from '../errors/custom-error.js';

const router = express.Router ();

router.post ('/register', register);
router.post ('/login', login);
router.get ('/test', requireSignIn, (req, res) => {
  res.send ('allowed to login');
});
export default router;
