import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
const app = express ();
import cors from 'cors';
import connectDB from './config/db/connect.js';
import notFoundMiddleware from './middlewares/not-found.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';

const port = process.env.PORT || 8080;

//configure env
dotenv.config ();

//middlewares
app.use ((req, res, next) => {
  res.setHeader ('Referrer-Policy', 'strict-origin-when-cross-origin');
  next ();
});
app.use (cors ());
app.use (express.json ());
app.use (morgan ('dev'));

//routes
app.use ('/api/v1/auth', authRoutes);

//routes an error handler
app.use (notFoundMiddleware);
app.use (errorHandlerMiddleware);

const start = async () => {
  try {
    connectDB ();
    app.listen (port, err => {
      if (err) {
        console.log ('error while running the app' + err);
      }
      console.log (`Server running on ${process.env.DEV_MODE} on port ${port}`);
    });
  } catch (error) {
    console.log ('error: ' + error);
  }
};

start ();
